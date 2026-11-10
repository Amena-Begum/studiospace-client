"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { PageSpinner } from "@/components/Skeletons";
import { useAuth } from "@/context/AuthContext";
import { safeNext } from "@/lib/returnTo";

const rules = [
  { label: "An uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "A lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "At least 6 characters", test: (p: string) => p.length >= 6 },
];

function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const dest = safeNext(useSearchParams().get("next"));
  const loginHref = dest === "/" ? "/login" : `/login?next=${encodeURIComponent(dest)}`;
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const passwordErr = rules.find((r) => !r.test(form.password));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const fail = (m: string) => {
      setError(m);
      toast.error(m);
    };
    if (!form.name.trim() || !form.email.trim() || !form.photoURL.trim() || !form.password) return fail("Please fill in every field.");
    if (!/^https?:\/\//i.test(form.photoURL.trim())) return fail("Photo URL must start with http:// or https://.");
    if (passwordErr) return fail("Password needs an uppercase letter, a lowercase letter and at least 6 characters.");
    setBusy(true);
    try {
      await register(form);
      toast.success("Welcome to Mohalla! Your account is ready. Please log in.");
      router.push(loginHref);
    } catch (err) {
      fail(err instanceof Error ? err.message : "Registration failed.");
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.1fr] md:py-20">
      <div className="hidden md:block">
        <p className="eyebrow">Join Mohalla</p>
        <h1 className="section-title mt-3">Meet the neighbours who make things better.</h1>
        <p className="mt-4 max-w-sm leading-relaxed text-muted">One account lets you create events, join the ones you care about and keep track of both.</p>
      </div>
      <div className="card p-6 sm:p-9">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:hidden">Register</h1>
        <h2 className="hidden font-display text-3xl font-semibold tracking-tight md:block">Create your account</h2>
        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="label">Name</label>
            <input id="name" autoComplete="name" className="field" value={form.name} onChange={set("name")} placeholder="Your full name" />
          </div>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" type="email" autoComplete="email" className="field" value={form.email} onChange={set("email")} placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="photo" className="label">Photo URL</label>
            <input id="photo" type="url" className="field" value={form.photoURL} onChange={set("photoURL")} placeholder="https://…/your-photo.jpg" />
          </div>
          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <input id="password" type={show ? "text" : "password"} autoComplete="new-password" className="field pr-11" value={form.password} onChange={set("password")} placeholder="Create a password" />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted hover:text-ink">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <ul className="mt-2 space-y-1 text-[0.82rem]" aria-live="polite">
              {rules.map((r) => {
                const ok = r.test(form.password);
                return (
                  <li key={r.label} className={form.password ? (ok ? "text-tone" : "text-[#b42318] dark:text-[#ff8f84]") : "text-muted"}>
                    {ok ? "✓" : "•"} {r.label}
                  </li>
                );
              })}
            </ul>
          </div>
          {error && <p role="alert" className="rounded-xl border border-[#b42318]/40 bg-[#b42318]/10 px-3.5 py-2.5 text-sm font-semibold text-[#b42318] dark:text-[#ff8f84]">{error}</p>}
          <button type="submit" className="btn btn-primary w-full !py-3.5" disabled={busy}>{busy ? "Creating account…" : "Register"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Already registered? <Link href={loginHref} className="font-bold text-accent underline underline-offset-4">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <RegisterForm />
    </Suspense>
  );
}
