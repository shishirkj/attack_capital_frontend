"use client";

import { PostCard } from "./PostCard";
import type { Post } from "@/src/domain/entities/Post";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DashboardPostListProps {
	posts: Post[];
	page: number;
	hasMore: boolean;
	onPageChange: (newPage: number) => void;
}

export function DashboardPostList({
	posts,
	page,
	hasMore,
	onPageChange,
}: DashboardPostListProps) {
	return (
		<div className="space-y-6">
			<div className="space-y-4 ">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>

			<div className="flex justify-center gap-4 mt-2">
				<Button
					variant="outline"
					onClick={() => onPageChange(page - 1)}
					disabled={page === 1}
					className="flex items-center gap-2"
				>
					<ChevronLeft size={16} />
					Previous
				</Button>
				<Button
					variant="outline"
					onClick={() => onPageChange(page + 1)}
					disabled={!hasMore}
					className="flex items-center gap-2"
				>
					Next
					<ChevronRight size={16} />
				</Button>
			</div>
		</div>
	);
}
