"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getNote, saveSummary, saveQuiz } from "@/lib/firestore";
import { generateSummary, generateQuiz, explainContent } from "@/lib/gemini";
import { useAuth } from "@/components/AuthProvider";
import type { Note } from "@/types";
import {
  ArrowLeft, Sparkles, BookOpen, Brain,
  Loader2, ChevronDown, ChevronUp
} from "lucide-react";

type AIResult = { type: "summary" | "quiz" | "explain"; content: string };

export default function NotePage() {
  const { user }  = useAuth();
  const params    = useParams();
  const router    = useRouter();
  const noteId    = params.id as string;

  const [note, setNote]           = useState<Note | null>(null);
  const [loading, setLoading]     = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [result, setResult]       = useState<AIResult | null>(null);
  const [error, setError]         = useState("");
  const [showNote, setShowNote]   = useState(true);
  const [explainLevel, setExplainLevel] = useState<"beginner" | "high_school" | "university">("beginner");

  useEffect(() => {
    getNote(noteId).then((n) => {
      if (!n) router.push("/dashboard");
      setNote(n);
      setLoading(false);
    });
  }, [noteId, router]);

  async function runAI(action: "summary" | "quiz" | "explain") {
    if (!note || !user) return;
    setAiLoading(true);
    setResult(null);
    setError("");
    try {
      let content = "";
      if (action === "summary") {
        content = await generateSummary(note.content);
        await saveSummary(user.uid, note.id, note.title, content);
      } else if (action === "quiz") {
        content = await generateQuiz(note.content);
        await saveQuiz(user.uid, note.id, note.title, content);
      } else {
        content = await explainContent(note.content, explainLevel);
      }
      setResult({ type: action, content });
    } catch {
      setError("AI request failed. Check your Gemini API key in .env.local.");
    } finally {
      setAiLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <Loader2 size={24} className="animate-spin text-brand-400" />
    </div>
  );

  if (!note) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={15} /> Dashboard
          </Link>
          <span className="text-sm text-white/30 hidden md:block">StudyMate AI</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-2">{note.title}</h1>
        <p className="text-sm text-white/40 mb-8">
          {note.content.split(" ").length} words
        </p>

        {/* Note content (collapsible) */}
        <div className="card mb-6">
          <button
            className="w-full flex items-center justify-between text-sm font-medium"
            onClick={() => setShowNote((v) => !v)}
          >
            <span>Your notes</span>
            {showNote ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showNote && (
            <p className="mt-4 text-white/60 text-sm leading-relaxed whitespace-pre-wrap">
              {note.content}
            </p>
          )}
        </div>

        {/* AI Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => runAI("summary")}
            disabled={aiLoading}
            className="card flex items-center gap-3 hover:border-brand-600/50 transition-colors text-left"
          >
            <div className="w-9 h-9 bg-brand-600/20 rounded-lg flex items-center justify-center text-brand-400 shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-medium text-sm">Generate summary</p>
              <p className="text-xs text-white/40 mt-0.5">Bullet-point key concepts</p>
            </div>
          </button>

          <button
            onClick={() => runAI("quiz")}
            disabled={aiLoading}
            className="card flex items-center gap-3 hover:border-brand-600/50 transition-colors text-left"
          >
            <div className="w-9 h-9 bg-brand-600/20 rounded-lg flex items-center justify-center text-brand-400 shrink-0">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="font-medium text-sm">Generate quiz</p>
              <p className="text-xs text-white/40 mt-0.5">5 multiple choice questions</p>
            </div>
          </button>

          <div className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-brand-600/20 rounded-lg flex items-center justify-center text-brand-400 shrink-0">
                <Brain size={18} />
              </div>
              <div>
                <p className="font-medium text-sm">Teach me</p>
                <p className="text-xs text-white/40 mt-0.5">Explain at my level</p>
              </div>
            </div>
            <select
              className="input text-xs py-1.5 mb-2"
              value={explainLevel}
              onChange={(e) => setExplainLevel(e.target.value as typeof explainLevel)}
            >
              <option value="beginner">Explain like I&apos;m 10</option>
              <option value="high_school">High school level</option>
              <option value="university">University level</option>
            </select>
            <button
              onClick={() => runAI("explain")}
              disabled={aiLoading}
              className="btn-primary w-full text-xs py-1.5"
            >
              Explain it
            </button>
          </div>
        </div>

        {/* AI Result */}
        {aiLoading && (
          <div className="card flex items-center gap-3 text-white/50">
            <Loader2 size={18} className="animate-spin text-brand-400" />
            <span className="text-sm">AI is thinking…</span>
          </div>
        )}

        {error && (
          <div className="card border-red-400/20 bg-red-400/5 text-red-400 text-sm">
            {error}
          </div>
        )}

        {result && !aiLoading && (
          <div className="card">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              {result.type === "summary" && <><Sparkles size={16} className="text-brand-400" /><span className="text-sm font-medium">AI Summary</span></>}
              {result.type === "quiz"    && <><BookOpen  size={16} className="text-brand-400" /><span className="text-sm font-medium">Quiz</span></>}
              {result.type === "explain" && <><Brain     size={16} className="text-brand-400" /><span className="text-sm font-medium">Explanation</span></>}
              <span className="ml-auto text-xs text-white/30 bg-white/5 rounded-full px-2 py-0.5">
                Saved to history
              </span>
            </div>
            <div className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
              {result.content}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
