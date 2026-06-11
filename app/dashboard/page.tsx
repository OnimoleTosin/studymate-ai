"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserNotes, getUserSummaries, getUserQuizzes, deleteNote } from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";
import type { Note, Summary, Quiz } from "@/types";
import { Brain, Plus, FileText, Sparkles, BookOpen, LogOut, Trash2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router            = useRouter();
  const [notes, setNotes]         = useState<Note[]>([]);
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [quizzes, setQuizzes]     = useState<Quiz[]>([]);
  const [fetching, setFetching]   = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      getUserNotes(user.uid),
      getUserSummaries(user.uid),
      getUserQuizzes(user.uid),
    ]).then(([n, s, q]) => {
      setNotes(n);
      setSummaries(s);
      setQuizzes(q);
      setFetching(false);
    });
  }, [user]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this note?")) return;
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  async function handleLogout() {
    await signOut(auth);
    router.push("/");
  }

  if (loading || !user) return null;

  const firstName = user.displayName?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Brain size={16} />
            </div>
            <span className="font-semibold">StudyMate AI</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <LogOut size={15} /> Log out
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Welcome back, {firstName} 👋</h1>
            <p className="text-white/50 text-sm mt-1">Ready to study smarter today?</p>
          </div>
          <Link href="/notes/new" className="btn-primary flex items-center gap-2">
            <Plus size={16} /> New note
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: <FileText size={18} />, label: "Notes", value: notes.length },
            { icon: <Sparkles size={18} />, label: "Summaries", value: summaries.length },
            { icon: <BookOpen size={18} />, label: "Quizzes", value: quizzes.length },
          ].map((s) => (
            <div key={s.label} className="card flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-600/20 rounded-lg flex items-center justify-center text-brand-400">
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-white/40">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Your notes</h2>
            <Link href="/notes/new" className="text-sm text-brand-400 hover:text-brand-200">
              + Add note
            </Link>
          </div>

          {fetching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse h-28 bg-white/5" />
              ))}
            </div>
          ) : notes.length === 0 ? (
            <div className="card text-center py-12">
              <FileText size={32} className="mx-auto text-white/20 mb-3" />
              <p className="text-white/40 text-sm">No notes yet.</p>
              <Link href="/notes/new" className="btn-primary inline-flex items-center gap-2 mt-4 text-sm">
                <Plus size={14} /> Upload your first note
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <div key={note.id} className="card group flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <Link href={`/notes/${note.id}`} className="font-medium hover:text-brand-400 transition-colors line-clamp-2">
                      {note.title}
                    </Link>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all ml-2 shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="text-sm text-white/40 line-clamp-2">{note.content}</p>
                  <div className="flex items-center gap-1 text-xs text-white/25 mt-auto">
                    <Clock size={11} />
                    {note.createdAt
                      ? formatDistanceToNow(note.createdAt.toDate(), { addSuffix: true })
                      : "Just now"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Study history */}
        {(summaries.length > 0 || quizzes.length > 0) && (
          <div className="mt-10">
            <h2 className="font-semibold text-lg mb-4">Past sessions</h2>
            <div className="space-y-2">
              {summaries.slice(0, 5).map((s) => (
                <div key={s.id} className="card flex items-center gap-3 py-3">
                  <Sparkles size={16} className="text-brand-400 shrink-0" />
                  <span className="text-sm">{s.noteTitle} — Summary</span>
                  <span className="ml-auto text-xs text-white/30">
                    {s.createdAt ? formatDistanceToNow(s.createdAt.toDate(), { addSuffix: true }) : ""}
                  </span>
                </div>
              ))}
              {quizzes.slice(0, 5).map((q) => (
                <div key={q.id} className="card flex items-center gap-3 py-3">
                  <BookOpen size={16} className="text-brand-400 shrink-0" />
                  <span className="text-sm">{q.noteTitle} — Quiz</span>
                  <span className="ml-auto text-xs text-white/30">
                    {q.createdAt ? formatDistanceToNow(q.createdAt.toDate(), { addSuffix: true }) : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
