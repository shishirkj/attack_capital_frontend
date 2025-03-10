"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PostServiceImpl } from "@/src/data/services/post/PostServiceImpl";
import { PostSkeleton } from "@/src/components/PostSkeleton";

const postService = new PostServiceImpl();

export default function PostPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["post", params.id],
		queryFn: () => postService.getPost(params.id),
	});

	if (error) {
		return (
			<div className="min-h-screen bg-background py-8">
				<div className="container mx-auto px-4">
					<Card className="max-w-3xl mx-auto">
						<CardContent className="pt-6">
							<p className="text-center text-destructive">
								Failed to load post
							</p>
							<Button
								variant="outline"
								className="mt-4 mx-auto block"
								onClick={() => router.push("/")}
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Home
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<PostSkeleton />
			</div>
		);
	}

	if (!post) {
		return (
			<div className="min-h-screen bg-background py-8">
				<div className="container mx-auto px-4">
					<Card className="max-w-3xl mx-auto">
						<CardContent className="pt-6">
							<p className="text-center">Post not found</p>
							<Button
								variant="outline"
								className="mt-4 mx-auto block"
								onClick={() => router.push("/")}
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Home
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background py-8">
			<div className="container mx-auto px-4">
				<Card className="max-w-3xl mx-auto">
					<CardHeader>
						<Button
							variant="ghost"
							className="mb-4"
							onClick={() => router.push("/")}
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Home
						</Button>
						<div className="flex items-center space-x-4 mb-4">
							<Avatar>
								<AvatarFallback>{post?.authorName?.[0] || "A"}</AvatarFallback>
							</Avatar>
							<div>
								<h1 className="text-3xl font-bold">{post.title}</h1>
								<p className="text-sm text-muted-foreground">
									By {post.authorName} •
									{post.createdAt
										? format(new Date(post.createdAt), "MMMM dd, yyyy")
										: "Unknown Date"}
								</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="prose dark:prose-invert max-w-none">
							{post.content}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
