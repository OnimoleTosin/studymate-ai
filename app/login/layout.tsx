import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://studymateai-git-main-onimole-sodiqs-projects.vercel.app/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
