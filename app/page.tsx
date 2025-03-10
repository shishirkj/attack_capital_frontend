"use client";

import { PostList } from "@/src/components/PostList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { PenSquare, User } from "lucide-react";

export default function HomePage() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	return (
		<div className="container mx-auto py-8">
			{isAuthenticated && (
				<div className="flex gap-4 mb-8 justify-end">
					<Button
						variant="outline"
						onClick={() => router.push("/dashboard")}
						className="flex items-center gap-2"
					>
						<User size={18} />
						My Posts
					</Button>
					<Button
						onClick={() => router.push("/dashboard")}
						className="flex items-center gap-2"
					>
						<PenSquare size={18} />
						Create Post
					</Button>
				</div>
			)}
			<PostList />
		</div>
	);
}
