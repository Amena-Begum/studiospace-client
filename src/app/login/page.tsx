"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import GithubButton from "@/components/GithubButton";
import { PageSpinner } from "@/components/Skeletons";
import { useAuth } from "@/context/AuthContext";
import { safeNext } from "@/lib/returnTo";

function LoginForm() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");
  const dest = safeNext(next);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const code = params.get("error");
    if (!code) return;
    const messages: Record<string, string> = {
      github_not_configured: "GitHub sign-in isn't switched on for this site yet. Please use email and password.",
      github_no_email: "GitHub didn't share a verified email address, so we couldn't sign you in.",
      github_failed: "GitHub sign-in didn't complete. Please try again.",
    };
    toast.error(messages[code] ?? "Sign-in failed. Please try again.");
  }, [params]);

  useEffect(() => {
    if (!loading && user && !busy) router.replace(dest);
  }, [loading, user, busy, router, dest]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setBusy(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}!`);
      router.replace(dest);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed.";
      setError(msg);
      toast.error(msg);
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.1fr] md:py-20">
      <div className="hidden md:block">
        <p className="eyebrow">Welcome back</p>
        <h1 className="section-title mt-3">Your neighbours are waiting for you.</h1>
        <p className="mt-4 max-w-sm leading-relaxed text-muted">Log in to create events, keep them up to date and see the events you have joined.</p>
      </div>
      <div className="card p-6 sm:p-9">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:hidden">Login</h1>
        <h2 className="hidden font-display text-3xl font-semibold tracking-tight md:block">Login to Mohalla</h2>
        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" type="email" autoComplete="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <input id="password" type={show ? "text" : "password"} autoComplete="current-password" className="field pr-11" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted hover:text-ink">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {error && <p role="alert" className="rounded-xl border border-[#b42318]/40 bg-[#b42318]/10 px-3.5 py-2.5 text-sm font-semibold text-[#b42318] dark:text-[#ff8f84]">{error}</p>}
          <button type="submit" className="btn btn-primary w-full !py-3.5" disabled={busy}>{busy ? "Logging in…" : "Login"}</button>
        </form>
        <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted">
          <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
        </div>
        <GithubButton next={dest} />
        <p className="mt-6 text-center text-sm text-muted">
          New to Mohalla? <Link href={dest === "/" ? "/register" : `/register?next=${encodeURIComponent(dest)}`} className="font-bold text-accent underline underline-offset-4">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <LoginForm />
    </Suspense>
  );
}
