import type { Post, PostDTO } from "@/src/domain/entities/Post";

export interface PostService {
	getPosts(
		page: number,
		limit: number,
	): Promise<{ posts: Post[]; hasMore: boolean }>;
	getPostsByAuthor(
		authorId: string,
		page: number,
		limit: number,
	): Promise<{ posts: Post[]; hasMore: boolean }>;
	getPost(id: string): Promise<Post>;
	createPost(
		post: Omit<PostDTO, "id" | "createdAt" | "updatedAt">,
	): Promise<Post>;
}
