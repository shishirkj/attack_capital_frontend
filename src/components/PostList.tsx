"use client";

import { usePosts } from "../infrastructure/query/posts";
import { PostCard } from "./PostCard";
import { PostSkeleton } from "./PostSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PostList() {
	const { data, isLoading, page, setPage, hasMore } = usePosts();

	if (isLoading) {
		return (
			<div className="space-y-4">
				{[...Array(3)].map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<PostSkeleton key={i} />
				))}
			</div>
		);
	}

	const posts = data?.posts ?? [];

	return (
		<div className="space-y-6">
			<div className="space-y-4">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>

			<div className="flex justify-center gap-4 py-6">
				<Button
					variant="outline"
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
					className="flex items-center gap-2 px-6 py-2  pr-2 bg-white text-black border border-gray-200 hover:bg-gray-50 disabled:bg-gray-100"
				>
					<ChevronLeft size={16} />
					Previous
				</Button>
				<Button
					variant="outline"
					onClick={() => setPage(page + 1)}
					disabled={!hasMore}
					className="flex items-center gap-2 px-6 py-2 pl-2 bg-white text-black border border-gray-200 hover:bg-gray-50 disabled:bg-gray-100"
				>
					Next
					<ChevronRight size={16} />
				</Button>
			</div>
		</div>
	);
}
