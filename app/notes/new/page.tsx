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
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={15} /> Back to dashboard
          </Link>
          <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm py-2">
            <Save size={14} /> {saving ? "Saving…" : "Save note"}
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-8">New note</h1>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-white/60 block mb-1.5">Title</label>
            <input
              type="text"
              className="input text-lg font-medium"
              placeholder="e.g. JavaScript Functions"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-white/60 block mb-1.5">Notes</label>
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
