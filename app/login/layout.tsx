import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in | StudyMate AI",
  description: "Log in to StudyMate AI to continue studying with AI-powered notes, summaries, and quizzes.",
  alternates: {
    canonical: "https://studymateai-git-main-onimole-sodiqs-projects.vercel.app/login",
  },
  openGraph: {
    title: "Log in | StudyMate AI",
    description:
      "Log in to StudyMate AI to continue studying with AI-powered notes, summaries, and quizzes.",
    url: "https://studymateai-git-main-onimole-sodiqs-projects.vercel.app/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
