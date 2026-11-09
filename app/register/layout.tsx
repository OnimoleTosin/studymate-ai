import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | StudyMate AI",
  description:
    "Create a StudyMate AI account to turn your notes into personalized summaries, quizzes, and explanations.",
  alternates: {
    canonical:
      "https://studymateai-git-main-onimole-sodiqs-projects.vercel.app/register",
  },
  openGraph: {
    title: "Sign up | StudyMate AI",
    description:
      "Create a StudyMate AI account to turn your notes into personalized summaries, quizzes, and explanations.",
    url: "https://studymateai-git-main-onimole-sodiqs-projects.vercel.app/register",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
