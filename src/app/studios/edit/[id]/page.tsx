"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import PrivateRoute from "@/components/PrivateRoute";
import { PageSpinner } from "@/components/Skeletons";
import StudioForm, { fromStudio, type StudioFormValues } from "@/components/StudioForm";
import { useAuth } from "@/context/AuthContext";
import { api, ApiError } from "@/lib/api";
import type { Studio } from "@/lib/types";

function EditStudio() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<Studio>(`/studios/${id}`).then(setStudio).catch(setError);
  }, [id]);

  const save = async (v: StudioFormValues) => {
    setBusy(true);
    try {
      await api(`/studios/${id}`, { method: "PUT", body: v });
      toast.success("Studio updated.");
      router.push("/my-listings");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update the studio.");
      setBusy(false);
    }
  };

  if (error) return <div className="px-4 py-16"><EmptyState title={error.status === 404 ? "Studio not found" : "We couldn't load this studio"} message={error.message} ctaLabel="Back to my listings" ctaHref="/my-listings" /></div>;
  if (!studio) return <PageSpinner label="Loading your listing…" />;
  if (studio.ownerEmail !== user?.email) return <div className="px-4 py-16"><EmptyState title="That isn't your listing" message="You can only edit studios that you host." ctaLabel="Back to my listings" ctaHref="/my-listings" /></div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Update listing</p>
      <h1 className="section-title mt-2">Edit {studio.title}</h1>
      <div className="mt-8">
        <StudioForm initial={fromStudio(studio)} owner={{ name: studio.ownerName, email: studio.ownerEmail }} submitLabel="Save changes" busy={busy} onSubmit={save} />
      </div>
    </div>
  );
}

export default function Page() {
  return <PrivateRoute><EditStudio /></PrivateRoute>;
}
