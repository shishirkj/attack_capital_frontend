import axios from "axios";
import type {
	AuthService,
	LoginCredentials,
	SignupCredentials,
} from "./AuthService";
import { Auth } from "@/src/domain/entities/Auth";
import Cookies from "js-cookie";

export class AuthServiceImpl implements AuthService {
	private readonly baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

	async login(credentials: LoginCredentials): Promise<Auth> {
		try {
			const response = await axios.post(`${this.baseUrl}/login`, credentials, {
				withCredentials: true,
			});
			const auth = new Auth(response.data);
			return auth;
		} catch (error) {
			throw new Error("Invalid credentials");
		}
	}

	async signup(credentials: SignupCredentials): Promise<Auth> {
		try {
			const response = await axios.post(`${this.baseUrl}/signup`, credentials, {
				withCredentials: true,
			});
			const auth = new Auth(response.data);
			return auth;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error:any) {
			throw new Error(error.response.data.errors[0].message);
		}
	}

	async logout(): Promise<void> {
		Cookies.remove("token");
		window.location.href = "/login";
	}
}
