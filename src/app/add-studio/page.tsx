"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm, { emptyStudio, type StudioFormValues } from "@/components/StudioForm";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

function AddStudio() {
  const { user } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const save = async (v: StudioFormValues) => {
    setBusy(true);
    try {
      await api("/studios", { method: "POST", body: v });
      toast.success("Your studio is live.");
      router.push("/my-listings");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save the studio.");
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Host your space</p>
      <h1 className="section-title mt-2">Add a new studio</h1>
      <p className="mb-8 mt-3 max-w-xl text-muted">Tell creators what your room offers. You can edit or remove the listing at any time.</p>
      <StudioForm initial={emptyStudio} owner={user!} submitLabel="Publish studio" busy={busy} onSubmit={save} />
    </div>
  );
}

export default function Page() {
  return <PrivateRoute><AddStudio /></PrivateRoute>;
}
