import type { Auth } from "@/src/domain/entities/Auth";

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface SignupCredentials extends LoginCredentials {
	name: string;
}

export interface AuthService {
	login(credentials: LoginCredentials): Promise<Auth>;
	signup(credentials: SignupCredentials): Promise<Auth>;
	logout(): Promise<void>;
}
