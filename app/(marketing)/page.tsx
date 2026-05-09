"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Zap, CheckCircle2, BookOpen, DollarSign, Code2, Briefcase,
  ChevronRight, Star, Lock, Clock, Trophy, Loader2
} from "lucide-react";

const MODULES = [
  { num: "01", title: "Getting Started With Cursor", desc: "Install Cursor, understand the interface, make your first AI edit, and see the ROI from day one.", lessons: 4 },
  { num: "02", title: "Core AI Workflows", desc: "Master Chat, Composer, Tab completion, and inline editing — the four workflows that drive everything.", lessons: 4 },
  { num: "03", title: "Working With Your Codebase", desc: "Open real projects, understand unfamiliar code, make multi-file edits, and navigate large repos.", lessons: 4 },
  { num: "04", title: "Building Real Products", desc: "Build features end-to-end, debug with AI, write tests automatically, and ship with clean git history.", lessons: 4 },
  { num: "05", title: "Advanced Cursor Techniques", desc: ".cursorrules setup, context management, multi-agent workflows, and large codebase navigation.", lessons: 4 },
  { num: "06", title: "Business Use Cases", desc: "Landing pages, SaaS products, Stripe integration, client work, and automation scripts that pay.", lessons: 5 },
  { num: "07", title: "Speed and Efficiency", desc: "Daily workflow systems, keyboard shortcuts, reusable templates, cost control, and team setup.", lessons: 5 },
  { num: "08", title: "Make Money With Cursor", desc: "Freelance playbook, micro-SaaS, sellable templates, internal tools, and productizing your workflow.", lessons: 5, highlight: true },
];

const TESTIMONIALS = [
  { name: "Alex R.", role: "Freelance Developer", text: "I landed two freelance clients in the first week after finishing this course. Cursor changed how I pitch and deliver." },
  { name: "Maya T.", role: "Founder", text: "Built and launched my first micro-SaaS in 4 days. I couldn't have done it without the business workflow they teach here." },
  { name: "Jordan K.", role: "Agency Owner", text: "I was skeptical AI tools were worth it. Module 3 alone saved me 6 hours on a client project." },
];

function UpgradeScroller() {
  const searchParams = useSearchParams();
  const upgrade = searchParams.get("upgrade");
  useEffect(() => {
    if (upgrade === "true") {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [upgrade]);
  return null;
}

export default function LandingPage() {
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState("");

  async function handleBuyNow() {
    setBuying(true);
    setBuyError("");
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      if (res.status === 401) {
        window.location.href = "/sign-up";
        return;
      }
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setBuyError("Something went wrong. Please try again.");
      setBuying(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Suspense fallback={null}><UpgradeScroller /></Suspense>

      {/* Nav */}
      <nav className="border-b border-slate-800/50 sticky top-0 z-10 bg-slate-950/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Zap className="w-5 h-5 text-brand-400" />
            Build With Cursor
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-slate-400 hover:text-white text-sm transition-colors">
              Sign in
            </Link>
            <button
              onClick={handleBuyNow}
              disabled={buying}
              className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {buying && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Get Access — $97
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-900/40 text-brand-300 text-sm px-4 py-1.5 rounded-full border border-brand-800/50 mb-6">
          <Star className="w-3.5 h-3.5" />
          Built for entrepreneurs who ship
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
          Ship Products Faster With{" "}
          <span className="text-brand-400">Cursor AI</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Skip the learning curve. Go from idea to deployed product with the AI editor
          that writes, edits, and explains code alongside you.
        </p>
        {buyError && (
          <p className="text-red-400 text-sm mt-2 mb-4">{buyError}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBuyNow}
            disabled={buying}
            className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {buying ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            Start Building — $97 <ChevronRight className="w-5 h-5" />
          </button>
          <Link
            href="#curriculum"
            className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
          >
            See the Curriculum
          </Link>
        </div>
        <p className="text-slate-600 text-sm mt-4">One-time payment · Lifetime access · No subscription</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto mt-14">
          {[
            { icon: BookOpen, val: "35+", label: "Lessons" },
            { icon: Clock, val: "8", label: "Modules" },
            { icon: Trophy, val: "Lifetime", label: "Access" },
          ].map(({ icon: Icon, val, label }) => (
            <div key={label} className="bg-slate-900 rounded-xl p-4 border border-slate-800">
              <Icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{val}</p>
              <p className="text-slate-500 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you'll be able to do */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">What you&apos;ll be able to do</h2>
        <p className="text-slate-400 text-center mb-10">Every lesson ties back to a real business or income outcome.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Build and deploy full products using Cursor in a single session",
            "Land freelance clients and deliver work 3× faster than before",
            "Write, debug, and refactor code with an AI pair programmer",
            "Configure Cursor for any project with .cursorrules files",
            "Build micro-SaaS products and charge recurring fees",
            "Create reusable templates and project starters to sell",
            "Automate client deliverables with scripts and internal tools",
            "Turn AI coding skills into productized, repeatable income",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Full Curriculum</h2>
        <p className="text-slate-400 text-center mb-10">8 focused modules. Every lesson has a clear business takeaway.</p>
        <div className="space-y-3">
          {MODULES.map((mod) => (
            <div
              key={mod.num}
              className={`rounded-xl border p-5 flex items-center gap-5 ${
                mod.highlight
                  ? "border-brand-700/50 bg-brand-900/20"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-sm font-bold shrink-0">
                {mod.num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">{mod.title}</h3>
                  {mod.highlight && (
                    <span className="bg-brand-600/30 text-brand-300 text-xs px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm mt-0.5">{mod.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 text-sm shrink-0">
                <BookOpen className="w-4 h-4" />
                {mod.lessons} lessons
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-10">What students say</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-400 fill-brand-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-white font-medium text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Who this is for</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Code2, title: "Developers", desc: "Ship faster, write cleaner code, and charge more. Cursor compresses hours of work into minutes." },
            { icon: DollarSign, title: "Entrepreneurs", desc: "Build products without a full dev team. Go from idea to launched in days, not months." },
            { icon: Briefcase, title: "Freelancers", desc: "Deliver more, work less. Module 8 alone will show you how to turn Cursor into recurring income." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-brand-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Simple Pricing</h2>
        <p className="text-slate-400 text-center mb-10">One payment. Lifetime access. No subscription.</p>
        <div className="bg-slate-900 border-2 border-brand-600/50 rounded-2xl p-8 text-center relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="bg-brand-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
              Best Value
            </span>
          </div>
          <div className="mb-6">
            <span className="text-6xl font-extrabold text-white">$97</span>
            <span className="text-slate-400 text-lg ml-2">one-time</span>
          </div>
          <ul className="space-y-3 mb-8 text-left max-w-xs mx-auto">
            {[
              "8 modules, 35+ lessons",
              "Business-first angle on every topic",
              "Module 8: Make Money With Cursor",
              "Lifetime access + future updates",
              "Works on any device",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={handleBuyNow}
            disabled={buying}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl text-lg font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {buying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
            {buying ? "Redirecting to checkout…" : "Get Instant Access"}
          </button>
          <p className="text-slate-600 text-xs mt-4">Secure checkout powered by Stripe</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-brand-400" />
          <span className="text-white font-semibold">Build With Cursor</span>
        </div>
        <p>© {new Date().getFullYear()} Build With Cursor · All rights reserved</p>
      </footer>
    </div>
  );
}
