import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/src/components/ThemeProvider";
import { QueryProvider } from "@/src/components/QueryProvider";
import ProtectedRoute from "@/components/common/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Blog Platform",
	description: "A modern blog platform built with Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ProtectedRoute>
					<QueryProvider>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							{children}
							<Toaster />
						</ThemeProvider>
					</QueryProvider>
				</ProtectedRoute>
			</body>
		</html>
	);
}
