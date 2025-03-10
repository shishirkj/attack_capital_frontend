import axios from "axios";
import type { PostService } from "./PostService";
import Cookies from "js-cookie";
import { Post, type PostDTO } from "@/src/domain/entities/Post";

export class PostServiceImpl implements PostService {
	private readonly baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

	async getPosts(
		page: number,
		limit: number,
	): Promise<{ posts: Post[]; hasMore: boolean }> {
		try {
			const response = await axios.get(
				`${this.baseUrl}/posts?page=${page}&limit=${limit}`,
			);
			const posts = response.data.posts.map((post: PostDTO) => new Post(post));
			return {
				posts,
				hasMore: response.data.hasMore,
			};
		} catch (error) {
			throw new Error("Failed to fetch posts");
		}
	}

	async getPostsByAuthor(
		authorId: string,
		page: number,
		limit: number,
	): Promise<{ posts: Post[]; hasMore: boolean }> {
		try {
			const token = Cookies.get("token");
			const response = await axios.get(
				`${this.baseUrl}/posts/author?authorId=${authorId}&page=${page}&limit=${limit}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);
			const posts = response.data.posts.map((post: PostDTO) => new Post(post));
			return {
				posts,
				hasMore: response.data.hasMore,
			};
		} catch (error) {
			throw new Error("Failed to fetch posts by author");
		}
	}

	async getPost(id: string): Promise<Post> {
		try {
			const response = await axios.get(`${this.baseUrl}/posts/${id}`);
			return new Post(response.data);
		} catch (error) {
			throw new Error("Failed to fetch post");
		}
	}

	async createPost(
		post: Omit<PostDTO, "id" | "createdAt" | "updatedAt">,
	): Promise<Post> {
		try {
			const token = Cookies.get("token");
			const response = await axios.post(`${this.baseUrl}/posts/create`, post, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			return new Post(response.data);
		} catch (error) {
			throw new Error("Failed to create post");
		}
	}
}
