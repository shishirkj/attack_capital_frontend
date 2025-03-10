"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreatePostFormProps {
	onSubmit: (data: { title: string; content: string }) => Promise<void>;
}

export default function CreatePostForm({ onSubmit }: CreatePostFormProps) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await onSubmit({ title, content });
			setTitle("");
			setContent("");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<Button
				variant="ghost"
				onClick={() => router.back()}
				className="flex items-center gap-2 mb-4"
			>
				<ArrowLeft size={16} />
				Back
			</Button>
			<div className="space-y-2">
				<Input
					placeholder="Post title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>
			<div className="space-y-2">
				<Textarea
					placeholder="Write your post content..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					required
					rows={5}
				/>
			</div>
			<Button type="submit" className="w-full" disabled={isSubmitting}>
				{isSubmitting ? "Creating..." : "Create Post"}
			</Button>
		</form>
	);
}
