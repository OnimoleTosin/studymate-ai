import type { Metadata } from "next";
import Link from "next/link";
import { FaHeart, FaGithub } from 'react-icons/fa';
import { BookOpen, Sparkles, Brain, BarChart3, ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://studymateai-git-main-onimole-sodiqs-projects.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
            <span className="font-semibold text-lg">Oni StudyMate AI</span>
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
          Upload your notes and let AI generate summaries, quizzes, and personalised explanations - all in seconds.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/register" className="btn-primary flex items-center gap-2">
            Start for free <ArrowRight size={16} />
          </Link>
          <Link href="/login" className="btn-ghost">
            I already have an account...
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <p className="text-xs font-medium tracking-widest text-brand-400 uppercase mb-2 text-center">
          How it works
        </p>
        <h2 className="text-3xl font-semibold text-center mb-4">
          Turn class notes into an active study session
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto text-center leading-relaxed mb-10">
          StudyMate AI gives you a simple way to move from reading your notes
          to working with the ideas in them. Start with the material you already
          have, then choose a study activity that fits what you need to review.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: "01",
              title: "Add your notes",
              desc: "Create a title for a topic or class, then paste your notes into StudyMate AI. Keeping each set focused on one subject can make its summaries and practice questions easier to review.",
            },
            {
              step: "02",
              title: "Choose how to study",
              desc: "Ask Gemini AI to make a concise, bullet-point summary, create five multiple-choice questions, or explain the material at a beginner, high-school, or university level.",
            },
            {
              step: "03",
              title: "Review and revisit",
              desc: "Read the generated response alongside your original notes. Saved notes, summaries, and quizzes are available from your dashboard so you can return to your study materials later.",
            },
          ].map((item) => (
            <div key={item.step} className="card">
              <p className="text-sm font-semibold text-brand-400 mb-3">{item.step}</p>
              <h3 className="font-medium text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
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

      {/* Study guidance */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest text-brand-400 uppercase mb-2">
              Make your review count
            </p>
            <h2 className="text-3xl font-semibold mb-4">
              More than rereading the same page
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Rereading can help you become familiar with a topic, but it does
              not always show which ideas you can explain or recall. StudyMate
              AI helps you approach your own notes in different ways: use a
              summary to revisit key points, try a quiz to check what you
              remember, or request a simpler explanation when a concept feels
              difficult.
            </p>
            <p className="text-white/60 leading-relaxed">
              These tools are designed to support your study routine, not
              replace your course materials or your own judgement. AI-generated
              summaries and answers can miss context, so compare them with your
              original notes and check important details against trusted class
              sources.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-lg mb-5">Ways to use StudyMate AI</h3>
            <ul className="space-y-4 text-sm text-white/60 leading-relaxed">
              <li>
                <span className="text-white font-medium">Before a test:</span>{" "}
                make a short summary of a topic, then use a quiz to find points
                that deserve another look.
              </li>
              <li>
                <span className="text-white font-medium">After class:</span>{" "}
                save your lecture notes with a clear title and ask for an
                explanation of unfamiliar ideas.
              </li>
              <li>
                <span className="text-white font-medium">When reviewing:</span>{" "}
                choose the explanation level that feels approachable, then
                return to the original material for the full context.
              </li>
            </ul>
          </div>
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

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <p className="text-xs font-medium tracking-widest text-brand-400 uppercase mb-2 text-center">
          Frequently asked questions
        </p>
        <h2 className="text-3xl font-semibold text-center mb-8">
          Getting started with StudyMate AI
        </h2>
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-medium mb-2">What can I do with my notes?</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Add a title and paste your study material into a note. From there,
              you can request a concise summary, generate five multiple-choice
              quiz questions, or ask for an explanation at one of three levels.
              Your saved notes and generated summaries and quizzes appear in
              your dashboard.
            </p>
          </div>
          <div className="card">
            <h3 className="font-medium mb-2">Can I choose how a topic is explained?</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Yes. Choose a beginner explanation, a high-school-level
              explanation, or a university-level explanation. Changing the
              level adjusts the language and depth used to explain the notes;
              it does not change your original material.
            </p>
          </div>
          <div className="card">
            <h3 className="font-medium mb-2">Does StudyMate AI replace my textbooks or teacher?</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              No. StudyMate AI is a study aid that generates responses from the
              notes you provide. Use it to organize review and practise
              recalling ideas, but verify important facts with your course
              materials, instructor, or other trusted sources.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to transform how you study?</h2>
        <p className="text-white/50 mb-8">
          Create an account, add a set of notes, and choose a way to review.
        </p>
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
            Built with <FaHeart className="text-white text-xs" /> using Next.js, Firebase & Also Gemini
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
