import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type AuthUser = {
	id: string;
	email: string;
};

type AuthState = {
	status: AuthStatus;
	user: AuthUser | null;
	error: string | null;
	lastSyncedAt: number | null;

	setUser: (user: AuthUser | null) => void;
	setStatus: (status: AuthStatus) => void;
	setError: (error: string | null) => void;
	reset: () => void;
};

export const useAuthStore = create<AuthState>()(
	devtools(
		immer((set) => ({
			user: null,
			status: "checking",
			error: null,
			lastSyncedAt: null,

			setUser: (user) => set({ user }),
			setStatus: (status) => set({ status }),
			setError: (error) => set({ error }),

			reset: () =>
				set({
					user: null,
					status: "unauthenticated",
					error: null,
					lastSyncedAt: null,
				}),
		})),
	),
);
