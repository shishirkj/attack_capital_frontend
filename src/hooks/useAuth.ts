"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthServiceImpl } from "../data/services/auth/AuthServiceImpl";
import type { Auth } from "../domain/entities/Auth";
import type {
	LoginCredentials,
	SignupCredentials,
} from "../data/services/auth/AuthService";

interface AuthState {
	auth: Auth | null;
	isLoading: boolean;
	error: string | null;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<void>;
	signup: (credentials: SignupCredentials) => Promise<void>;
	logout: () => Promise<void>;
}

const authService = new AuthServiceImpl();

export const useAuth = create<AuthState>()(
	persist(
		(set) => ({
			auth: null,
			isLoading: false,
			error: null,
			isAuthenticated: false,
			login: async (credentials) => {
				set({ isLoading: true, error: null });
				try {
					const auth = await authService.login(credentials);
					set({ auth, isLoading: false, isAuthenticated: true });
				} catch (error) {
					set({ error: "Invalid credentials", isLoading: false });
					throw error;
				}
			},
			signup: async (credentials) => {
				set({ isLoading: true, error: null });
				try {
					const auth = await authService.signup(credentials);
					set({ auth, isLoading: false, isAuthenticated: true });
				} catch (error) {
					set({ error: "Signup failed", isLoading: false });
					throw error;
				}
			},
			logout: async () => {
				await authService.logout();
				set({ auth: null, isAuthenticated: false });
			},
		}),
		{
			name: "auth-storage",
		},
	),
);
