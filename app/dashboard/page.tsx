"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/src/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { DashboardPostList } from "@/src/components/DashboardPostList";
import { usePostsByAuthor } from "@/src/infrastructure/query/posts";
import CreatePostForm from "@/components/CreatePostForm";
import { PostServiceImpl } from "@/src/data/services/post/PostServiceImpl";

export default function DashboardPage() {
	const { auth, isAuthenticated } = useAuth();
	const { toast } = useToast();
	const [page, setPage] = useState(1);
	const postService = new PostServiceImpl();

	const { data, isLoading, refetch } = usePostsByAuthor(
		auth?.user._id || "",
		page,
	);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleCreatePost = async (postData: any) => {
		try {
			await postService.createPost({
				...postData,
			});
			toast({
				title: "Success",
				description: "Post created successfully.",
			});
			refetch(); // Refresh the posts list
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to create post.",
			});
		}
	};

	if (!isAuthenticated) {
		return null; // Will redirect in useEffect
	}

	return (
		<div className="container mx-auto py-8">
			<div className="grid gap-8">
				<Card>
					<CardHeader>
						<CardTitle>Create New Post</CardTitle>
					</CardHeader>
					<CardContent>
						<CreatePostForm onSubmit={handleCreatePost} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Your Posts</CardTitle>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="flex justify-center">
								<p>Loading...</p>
							</div>
						) : data?.posts.length === 0 ? (
							<p className="text-center text-muted-foreground">
								You haven't created any posts yet.
							</p>
						) : (
							<DashboardPostList
								posts={data?.posts || []}
								page={page}
								hasMore={data?.hasMore || false}
								onPageChange={handlePageChange}
							/>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
