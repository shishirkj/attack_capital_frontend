"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import type { Post } from "../domain/entities/Post";

interface PostCardProps {
	post: Post;
}

export function PostCard({ post }: PostCardProps) {
	return (
		<Card className="w-full hover:shadow-lg transition-shadow">
			<CardHeader>
				<div className="flex items-center space-x-4">
					<Avatar>
						<AvatarFallback>{post?.authorName?.[0] || 'A'}</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle className="text-xl">{post.title}</CardTitle>
						<p className="text-sm text-muted-foreground">
							By {post.authorName} •{" "}
							{format(new Date(post.createdAt), "MMM dd, yyyy")}
						</p>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground line-clamp-3">{post.content}</p>
			</CardContent>
			<CardFooter>
				<Link
					href={`/posts/${post._id}`}
					className="text-primary hover:underline"
				>
					Read more
				</Link>
			</CardFooter>
		</Card>
	);
}
