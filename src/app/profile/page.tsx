"use client";

import { useState } from "react";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";

function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL ?? "");
  const [errors, setErrors] = useState<{ name?: string; photoURL?: string }>({});
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found: typeof errors = {};
    if (name.trim().length < 2) found.name = "Name must be at least 2 characters.";
    if (!/^https?:\/\/\S+$/i.test(photoURL.trim())) found.photoURL = "Enter a valid photo URL starting with http:// or https://.";
    setErrors(found);
    const first = Object.values(found)[0];
    if (first) return toast.error(first);
    setBusy(true);
    try {
      await updateProfile({ name: name.trim(), photoURL: photoURL.trim() });
      toast.success("Your profile has been updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update your profile.");
    } finally {
      setBusy(false);
    }
  };

  const err = (m?: string) => (m ? <p role="alert" className="mt-1.5 text-[0.82rem] font-semibold text-[#b42318] dark:text-[#ff8f84]">{m}</p> : null);

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 md:py-16">
      <p className="eyebrow">Account</p>
      <h1 className="section-title mt-3">My profile</h1>
      <div className="card mt-8 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user?.photoURL || `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(user?.name ?? "")}`} alt="" className="h-20 w-20 rounded-full border border-line object-cover" referrerPolicy="no-referrer" />
          <div className="min-w-0">
            <p className="truncate font-display text-2xl font-semibold">{user?.name}</p>
            <p className="truncate text-sm text-muted">{user?.email}</p>
          </div>
        </div>
        <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="label">Name</label>
            <input id="name" className="field" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(errors.name)} />
            {err(errors.name)}
          </div>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" className="field" value={user?.email ?? ""} readOnly />
          </div>
          <div>
            <label htmlFor="photo" className="label">Photo URL</label>
            <input id="photo" type="url" className="field" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} aria-invalid={Boolean(errors.photoURL)} />
            {err(errors.photoURL)}
          </div>
          <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : "Save Profile"}</button>
        </form>
      </div>
    </section>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
}
