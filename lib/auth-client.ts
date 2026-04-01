import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000/api/auth",
	plugins: [
		expoClient({
			scheme: "rnblogapp",
			storagePrefix: "rnblogapp",
			storage: SecureStore,
		}),
	],
});
