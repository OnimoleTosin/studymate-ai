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
    <div className="page-shell">
      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/[0.07] bg-[#09090b]/80 px-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 shadow-[0_8px_24px_-8px_rgba(139,92,246,.8)]">
              <Brain size={18} />
            </div>
            <span className="font-semibold tracking-tight">StudyMate <span className="text-violet-300">AI</span></span>
          </Link>
          <button onClick={handleLogout} aria-label="Log out" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white">
            <LogOut size={15} /> <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </nav>

      <main className="relative z-[1] mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">My workspace</p>
            <h1 className="break-words text-3xl font-semibold tracking-tight">Welcome back, {firstName}</h1>
            <p className="mt-2 text-sm text-zinc-400">Keep your momentum going. What will you review today?</p>
          </div>
          <Link href="/notes/new" className="btn-primary w-full sm:w-auto">
            <Plus size={16} /> New note
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: <FileText size={19} />, label: "Saved notes", value: notes.length, accent: "bg-violet-500/15 text-violet-300" },
            { icon: <Sparkles size={19} />, label: "Summaries", value: summaries.length, accent: "bg-sky-500/15 text-sky-300" },
            { icon: <BookOpen size={19} />, label: "Quizzes", value: quizzes.length, accent: "bg-emerald-500/15 text-emerald-300" },
          ].map((s) => (
            <div key={s.label} className="surface flex items-center gap-4 p-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.accent}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-semibold leading-none">{s.value}</p>
                <p className="mt-1 text-xs text-zinc-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your notes</h2>
            <Link href="/notes/new" className="text-sm font-medium text-violet-300 hover:text-violet-200">
              Add note +
            </Link>
          </div>

          {fetching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse h-28 bg-white/5" />
              ))}
            </div>
          ) : notes.length === 0 ? (
            <div className="surface py-14 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-zinc-500">
                <FileText size={22} />
              </div>
              <p className="font-medium">Start your first study session</p>
              <p className="mt-1 text-sm text-zinc-500">Add notes to create summaries and quizzes.</p>
              <Link href="/notes/new" className="btn-primary mt-5 text-sm">
                <Plus size={14} /> Upload your first note
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <article key={note.id} className="surface group flex min-h-44 flex-col gap-3 p-5 transition duration-200 hover:-translate-y-1 hover:border-violet-400/25">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/notes/${note.id}`} className="min-w-0 break-words font-semibold leading-snug transition-colors group-hover:text-violet-200 line-clamp-2">
                      {note.title}
                    </Link>
                    <button
                      onClick={() => handleDelete(note.id)}
                      aria-label={`Delete ${note.title}`}
                      className="ml-1 shrink-0 rounded-lg p-2 text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400 md:opacity-0 md:group-hover:opacity-100"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="line-clamp-3 text-sm leading-relaxed text-zinc-500">{note.content}</p>
                  <div className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-zinc-600">
                    <Clock size={11} />
                    {note.createdAt
                      ? formatDistanceToNow(note.createdAt.toDate(), { addSuffix: true })
                      : "Just now"}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Study history */}
        {(summaries.length > 0 || quizzes.length > 0) && (
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-semibold">Recent activity</h2>
            <div className="space-y-2">
              {summaries.slice(0, 5).map((s) => (
                <div key={s.id} className="surface flex flex-wrap items-center gap-3 px-4 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-300"><Sparkles size={15} /></div>
                  <span className="min-w-0 flex-1 break-words text-sm">{s.noteTitle} <span className="text-zinc-600">— Summary</span></span>
                  <span className="ml-auto shrink-0 text-xs text-zinc-600">
                    {s.createdAt ? formatDistanceToNow(s.createdAt.toDate(), { addSuffix: true }) : ""}
                  </span>
                </div>
              ))}
              {quizzes.slice(0, 5).map((q) => (
                <div key={q.id} className="surface flex flex-wrap items-center gap-3 px-4 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300"><BookOpen size={15} /></div>
                  <span className="min-w-0 flex-1 break-words text-sm">{q.noteTitle} <span className="text-zinc-600">— Quiz</span></span>
                  <span className="ml-auto shrink-0 text-xs text-zinc-600">
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
