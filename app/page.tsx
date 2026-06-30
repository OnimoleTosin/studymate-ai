"use client";
import Link from "next/link";
import { FaHeart, FaGithub } from 'react-icons/fa';
import { BookOpen, Sparkles, Brain, BarChart3, ArrowRight, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Brain size={16} />
            </div>
            <span className="font-semibold text-lg">StudyMate AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-600/10 border border-brand-600/30 rounded-full px-4 py-1.5 text-brand-200 text-sm mb-8">
          <Sparkles size={14} />
          Powered by Gemini AI
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
          Study smarter,<br />
          <span className="text-brand-400">not harder</span>
        </h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
          Upload your notes and let AI generate summaries, quizzes, and personalised explanations — all in seconds.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/register" className="btn-primary flex items-center gap-2">
            Start for free <ArrowRight size={16} />
          </Link>
          <Link href="/login" className="btn-ghost">
            I already have an account
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            { num: "50K+", label: "Students using StudyMate" },
            { num: "94%", label: "Improved test scores" },
            { num: "3×", label: "Faster understanding" },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <p className="text-3xl font-semibold text-brand-400">{s.num}</p>
              <p className="text-sm text-white/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <p className="text-xs font-medium tracking-widest text-brand-400 uppercase mb-2 text-center">Features</p>
        <h2 className="text-3xl font-semibold text-center mb-10">Everything you need to excel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <BookOpen size={20} />, title: "Smart notes", desc: "Paste your notes and have them organised instantly." },
            { icon: <Sparkles size={20} />, title: "AI summaries", desc: "Get concise, exam-ready summaries from any content." },
            { icon: <Brain size={20} />, title: "Quiz generator", desc: "Auto-generate multiple choice questions to test yourself." },
            { icon: <BarChart3 size={20} />, title: "Study history", desc: "Track every session, summary, and quiz in one place." },
          ].map((f) => (
            <div key={f.title} className="card">
              <div className="w-10 h-10 bg-brand-600/20 rounded-lg flex items-center justify-center text-brand-400 mb-4">
                {f.icon}
              </div>
              <h3 className="font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teach Me feature callout */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-brand-600/10 border border-brand-600/20 rounded-2xl p-8 md:p-12 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-600/20 rounded-full px-3 py-1 text-brand-300 text-xs font-medium mb-4">
            ✦ Signature feature
          </div>
          <h2 className="text-3xl font-semibold mb-4">The "Teach Me" button</h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            One button. Three levels. AI explains your notes exactly the way you need — whether you are a complete beginner or a university student.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {["Explain like I'm 10", "High school level", "University level"].map((l) => (
              <div key={l} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm">
                <Check size={14} className="text-brand-400" /> {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to transform how you study?</h2>
        <p className="text-white/50 mb-8">Join 50,000+ students already studying smarter with AI.</p>
        <Link href="/register" className="btn-primary inline-flex items-center gap-2">
          Get started for free <ArrowRight size={16} />
        </Link>
      </section>


      <footer className="border-t border-white/10 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-white/40">
            © 2026 <span className="text-white/60">ONImole</span>
          </p>

          <p className="text-xs text-white/30 mt-2 flex items-center justify-center gap-1">
            Built with <FaHeart className="text-white text-xs" /> using Next.js, Firebase & Gemini
          </p>

          <a href="https://github.com/OnimoleTosin" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors mt-3">
            <FaGithub  size={12} /> OnimoleTosin
          </a>

        </div>
      </footer>

    </div>
  );
}
