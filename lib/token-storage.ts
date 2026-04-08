import * as SecureStore from "expo-secure-store";

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export const tokenStorage = {
	async saveTokens(access: string, refresh: string) {
		await SecureStore.setItemAsync(ACCESS_KEY, access);
		await SecureStore.setItemAsync(REFRESH_KEY, refresh);
	},

	async getAccessToken() {
		return await SecureStore.getItemAsync(ACCESS_KEY);
	},

	async getRefreshToken() {
		return await SecureStore.getItemAsync(REFRESH_KEY);
	},

	async clearTokens() {
		await SecureStore.deleteItemAsync(ACCESS_KEY);
		await SecureStore.deleteItemAsync(REFRESH_KEY);
	},
};
