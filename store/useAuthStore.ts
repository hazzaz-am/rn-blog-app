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
	setLastSyncedAt: (timestamp: number | null) => void;
	reset: () => void;
};

export const useAuthStore = create<AuthState>()(
	(__DEV__ ? devtools : (fn: any) => fn)(
		immer<AuthState>((set) => ({
			user: null,
			status: "checking",
			error: null,
			lastSyncedAt: null,

			setUser: (user: AuthUser | null) => set({ user }),
			setStatus: (status: AuthStatus) => set({ status }),
			setError: (error: string | null) => set({ error }),
			setLastSyncedAt: (timestamp: number | null) => set({ lastSyncedAt: timestamp }),

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
