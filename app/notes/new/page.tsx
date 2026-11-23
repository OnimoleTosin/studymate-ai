"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createNote } from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft, Save } from "lucide-react";

export default function NewNotePage() {
  const { user }    = useAuth();
  const router      = useRouter();
  const [title, setTitle]     = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");

  async function handleSave() {
    if (!user) return;
    if (!title.trim() || !content.trim()) {
      setError("Please fill in both title and content.");
      return;
    }
    setSaving(true);
    try {
      const ref = await createNote(user.uid, title.trim(), content.trim());
      router.push(`/notes/${ref.id}`);
    } catch {
      setError("Failed to save note. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="page-shell">
      <nav className="relative z-10 border-b border-white/[0.07] bg-[#09090b]/80 px-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={15} /> Back to dashboard
          </Link>
          <button onClick={handleSave} disabled={saving} className="btn-primary shrink-0 py-2 px-3 text-xs sm:px-5 sm:text-sm">
            <Save size={14} /> {saving ? "Saving…" : "Save note"}
          </button>
        </div>
      </nav>

      <main className="relative z-[1] mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="eyebrow mb-2">Create</p>
        <h1 className="mb-7 text-3xl font-semibold tracking-tight">New study note</h1>

        <div className="surface space-y-5 p-5 sm:p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Title</label>
            <input
              type="text"
              className="input text-lg font-medium"
              placeholder="e.g. JavaScript Functions"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Notes</label>
            <textarea
              className="input min-h-[320px] resize-y leading-relaxed"
              placeholder="Paste your notes here… The more detail you include, the better the AI can summarise and quiz you."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button onClick={handleSave} disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2">
            <Save size={16} /> {saving ? "Saving…" : "Save note"}
          </button>
        </div>
      </main>
    </div>
  );
}
