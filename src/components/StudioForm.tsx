"use client";

import { ImageUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AMENITY_OPTIONS, CATEGORIES, type Studio, type User } from "@/lib/types";

export interface StudioFormValues {
  title: string;
  category: string;
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
}

export const emptyStudio: StudioFormValues = {
  title: "", category: "", hourlyRate: "", securityDeposit: "", maxCapacity: "", location: "", imageUrl: "", amenities: [], overview: "",
};

export function fromStudio(s: Studio): StudioFormValues {
  return {
    title: s.title, category: s.category, hourlyRate: String(s.hourlyRate), securityDeposit: String(s.securityDeposit),
    maxCapacity: String(s.maxCapacity), location: s.location, imageUrl: s.imageUrl, amenities: s.amenities, overview: s.overview,
  };
}

interface Props {
  initial: StudioFormValues;
  owner: Pick<User, "name" | "email">;
  submitLabel: string;
  busy: boolean;
  onSubmit: (values: StudioFormValues) => void;
}

export default function StudioForm({ initial, owner, submitLabel, busy, onSubmit }: Props) {
  const [v, setV] = useState<StudioFormValues>(initial);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
  const set = (k: keyof StudioFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV((p) => ({ ...p, [k]: e.target.value }));
  const toggle = (a: string) => setV((p) => ({ ...p, amenities: p.amenities.includes(a) ? p.amenities.filter((x) => x !== a) : [...p.amenities, a] }));
  // keep any custom amenities from an existing listing visible as checkboxes
  const options = Array.from(new Set([...AMENITY_OPTIONS, ...initial.amenities]));

  const upload = async (file: File | undefined) => {
    if (!file || !imgbbKey) return;
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file.");
    if (file.size > 8 * 1024 * 1024) return toast.error("Image must be smaller than 8 MB.");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data?.data?.url) throw new Error();
      setV((p) => ({ ...p, imageUrl: data.data.url }));
      toast.success("Image uploaded.");
    } catch {
      toast.error("Image upload failed. You can paste an image URL instead.");
    } finally {
      setUploading(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const fail = (m: string) => {
      setError(m);
      toast.error(m);
    };
    if (!v.title.trim()) return fail("Please add a title.");
    if (!v.category) return fail("Please choose a category.");
    if (!(Number(v.hourlyRate) > 0)) return fail("Hourly rate must be greater than 0.");
    if (v.securityDeposit === "" || !(Number(v.securityDeposit) >= 0)) return fail("Security deposit must be 0 or more.");
    if (!(Number.isInteger(Number(v.maxCapacity)) && Number(v.maxCapacity) > 0)) return fail("Max capacity must be a whole number above 0.");
    if (!v.location.trim()) return fail("Please add the location or address.");
    if (!/^https?:\/\//i.test(v.imageUrl.trim())) return fail("Add an image URL (or upload one) that starts with http:// or https://.");
    if (v.amenities.length === 0) return fail("Select at least one amenity.");
    if (!v.overview.trim()) return fail("Please write a detailed overview.");
    onSubmit(v);
  };

  return (
    <form onSubmit={submit} className="card space-y-6 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="title" className="label">Title</label>
          <input id="title" className="field" value={v.title} onChange={set("title")} placeholder="e.g. Daylight Loft with Cyc Wall" />
        </div>
        <div>
          <label htmlFor="category" className="label">Category</label>
          <select id="category" className="field" value={v.category} onChange={set("category")}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="capacity" className="label">Max capacity</label>
          <input id="capacity" type="number" min={1} step={1} className="field" value={v.maxCapacity} onChange={set("maxCapacity")} placeholder="People allowed at once" />
        </div>
        <div>
          <label htmlFor="rate" className="label">Hourly rate ($)</label>
          <input id="rate" type="number" min={1} step="0.5" className="field" value={v.hourlyRate} onChange={set("hourlyRate")} placeholder="45" />
        </div>
        <div>
          <label htmlFor="deposit" className="label">Security deposit ($)</label>
          <input id="deposit" type="number" min={0} step="1" className="field" value={v.securityDeposit} onChange={set("securityDeposit")} placeholder="150" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="location" className="label">Location / address</label>
          <input id="location" className="field" value={v.location} onChange={set("location")} placeholder="Street, city, country" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="image" className="label">Image URL</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="image" type="url" className="field" value={v.imageUrl} onChange={set("imageUrl")} placeholder="https://…" />
            {imgbbKey && (
              <label className={`btn btn-ghost shrink-0 ${uploading ? "pointer-events-none opacity-60" : ""}`}>
                <ImageUp size={17} /> {uploading ? "Uploading…" : "Upload image"}
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => upload(e.target.files?.[0])} />
              </label>
            )}
          </div>
          {v.imageUrl && /^https?:\/\//i.test(v.imageUrl) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.imageUrl} alt="Preview of the studio" className="mt-3 h-40 w-full max-w-xs rounded-xl border border-line object-cover" />
          )}
        </div>
      </div>

      <fieldset>
        <legend className="label">Amenities</legend>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((a) => {
            const on = v.amenities.includes(a);
            return (
              <label key={a} className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition ${on ? "border-accent bg-accent/10" : "border-line bg-surface hover:border-ink"}`}>
                <input type="checkbox" checked={on} onChange={() => toggle(a)} className="h-4 w-4 accent-[var(--accent)]" />
                {a}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="overview" className="label">Detailed overview</label>
        <textarea id="overview" rows={6} className="field resize-y" value={v.overview} onChange={set("overview")} placeholder="Describe the space, the light, access, house rules and what is included." />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="owner-name" className="label">Host name</label>
          <input id="owner-name" className="field" value={owner.name} readOnly />
        </div>
        <div>
          <label htmlFor="owner-email" className="label">Host email</label>
          <input id="owner-email" className="field" value={owner.email} readOnly />
        </div>
      </div>

      {error && <p role="alert" className="rounded-xl border border-[#b42318]/40 bg-[#b42318]/10 px-3.5 py-2.5 text-sm font-semibold text-[#b42318] dark:text-[#ff8f84]">{error}</p>}
      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary !px-8 !py-3.5" disabled={busy || uploading}>{busy ? "Saving…" : submitLabel}</button>
      </div>
    </form>
  );
}
