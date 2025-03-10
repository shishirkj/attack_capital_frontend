import { PostServiceImpl } from "@/src/data/services/post/PostServiceImpl";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const postService = new PostServiceImpl();
const POSTS_PER_PAGE = 5;

export function usePosts() {
	const [page, setPage] = useState(1);

	const { data, isLoading } = useQuery({
		queryKey: ["posts", page],
		queryFn: () => postService.getPosts(page, POSTS_PER_PAGE),
	});

	return {
		data,
		isLoading,
		page,
		setPage,
		hasMore: data?.hasMore ?? false,
	};
}

export function usePostsByAuthor(authorId: string, page: number) {
	return useQuery({
		queryKey: ["posts", "author", authorId, page],
		queryFn: () => postService.getPostsByAuthor(authorId, page, POSTS_PER_PAGE),
		enabled: !!authorId,
	});
}

export function usePost(id: string) {
	return useQuery({
		queryKey: ["post", id],
		queryFn: () => postService.getPost(id),
		staleTime: 1000 * 60 * 5,
	});
}
