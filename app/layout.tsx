import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://studymateai-git-main-onimole-sodiqs-projects.vercel.app",
  ),
  title: "StudyMate AI – Study smarter with AI",
  description: "Upload your notes. Let AI generate summaries, quizzes, and explanations tailored to your level.",
  openGraph: {
    title: "StudyMate AI – Study smarter with AI",
    description:
      "Upload your notes. Let AI generate summaries, quizzes, and explanations tailored to your level.",
    siteName: "StudyMate AI",
    locale: "en_US",
    type: "website",
    url: "https://studymateai-git-main-onimole-sodiqs-projects.vercel.app/",
  },
  other: {
    "google-site-verification": "Wn_sPa0vC-aVC62V4-yfZdXzhgWXYCPIi61nx1-aScI",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
