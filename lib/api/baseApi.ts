import { tokenStorage } from "../token-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL + "/api";

interface ApiError {
	status: number;
	message: string;
}

const TIMEOUT = 10000;

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), TIMEOUT);

	try {
		const res = await fetch(url, {
			...options,
			signal: controller.signal,
		});
		return res;
	} finally {
		clearTimeout(timeout);
	}
}

/**
 * Refresh token
 */
async function refreshToken(): Promise<string | null> {
	const refresh = await tokenStorage.getRefreshToken();
	if (!refresh) return null;

	try {
		const res = await fetch(`${BASE_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken: refresh }),
		});

		if (!res.ok) return null;

		const data = await res.json();

		await tokenStorage.saveTokens(data.accessToken, data.refreshToken);

		return data.accessToken;
	} catch {
		return null;
	}
}

/**
 * Core request handler
 */
async function request<T>(endpoint: string, options: RequestInit = {}, retry = true): Promise<T> {
	let token = await tokenStorage.getAccessToken();

	const headers: Record<string, string> = {
		...(options.headers as Record<string, string>),
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};

	if (!(options.body instanceof FormData)) {
		headers["Content-Type"] = "application/json";
	}

	let response: Response;

	try {
		response = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
			...options,
			headers,
		});
	} catch {
		throw { status: 0, message: "Network error" } as ApiError;
	}

	// Handle 401 → refresh token
	if (response.status === 401 && retry) {
		const newToken = await refreshToken();

		if (newToken) {
			return request<T>(endpoint, options, false);
		} else {
			await tokenStorage.clearTokens();
			throw { status: 401, message: "Unauthorized" } as ApiError;
		}
	}

	const contentType = response.headers.get("content-type") || "";
	const data = contentType.includes("application/json") ? await response.json() : await response.text();

	if (!response.ok) {
		throw {
			status: response.status,
			message: data?.message || "Request failed",
		} as ApiError;
	}

	return data;
}

/**
 * Public API methods
 */
export const api = {
	get: <T>(url: string) => request<T>(url),

	post: <T>(url: string, body?: unknown) =>
		request<T>(url, {
			method: "POST",
			body: body instanceof FormData ? body : JSON.stringify(body),
		}),

	put: <T>(url: string, body?: unknown) =>
		request<T>(url, {
			method: "PUT",
			body: JSON.stringify(body),
		}),

	delete: <T>(url: string) =>
		request<T>(url, {
			method: "DELETE",
		}),
};
