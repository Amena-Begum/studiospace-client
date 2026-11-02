"use client";

import { Check, MapPin, ShieldCheck, Star, Users } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BookingModal from "@/components/BookingModal";
import EmptyState from "@/components/EmptyState";
import { PageSpinner } from "@/components/Skeletons";
import { useAuth } from "@/context/AuthContext";
import { api, ApiError } from "@/lib/api";
import type { Studio } from "@/lib/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StudioDetails() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [missing, setMissing] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    api<Studio>(`/studios/${id}`)
      .then(setStudio)
      .catch((e: ApiError) => (e.status === 404 ? setMissing(true) : setError(e.message)));
  }, [id]);

  if (missing) return <div className="px-4 py-16"><EmptyState title="Studio not found" message="This listing may have been removed by its host." ctaLabel="Explore studios" ctaHref="/studios" /></div>;
  if (error) return <div className="px-4 py-16"><EmptyState title="We couldn't load this studio" message={error} ctaLabel="Try again" onCta={() => location.reload()} /></div>;
  if (!studio) return <PageSpinner label="Loading the studio…" />;

  const gallery = studio.gallery?.length ? studio.gallery : [studio.imageUrl];
  const isOwner = user?.email === studio.ownerEmail;
  const onBook = () => {
    if (authLoading) return;
    if (!user) return router.push(`/login?next=${encodeURIComponent(`/studios/${studio._id}`)}`);
    setBooking(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted">
        <Link href="/studios" className="hover:text-accent">Explore Studios</Link> <span aria-hidden>/</span> {studio.title}
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0">
          <Swiper modules={[Navigation, Pagination, A11y]} navigation pagination={{ clickable: true }} className="overflow-hidden rounded-[1.4rem] border border-line">
            {gallery.map((src, i) => (
              <SwiperSlide key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${studio.title}, photo ${i + 1} of ${gallery.length}`} className="aspect-[16/10] w-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-ink px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-bg">{studio.category}</span>
            <span className="inline-flex items-center gap-1 text-sm font-bold"><Star size={15} className="fill-accent text-accent" /> {studio.rating > 0 ? studio.rating.toFixed(1) : "No ratings yet"}</span>
          </div>
          <h1 className="section-title mt-3">{studio.title}</h1>
          <p className="mt-3 flex items-center gap-1.5 text-muted"><MapPin size={16} /> {studio.location}</p>

          <h2 className="mt-10 font-display text-2xl font-semibold">Overview</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">{studio.overview}</p>

          <h2 className="mt-10 font-display text-2xl font-semibold">Amenities</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {studio.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2.5 text-[0.95rem]"><Check size={17} className="shrink-0 text-tone" /> {a}</li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-semibold">Reviews</h2>
          {studio.reviews.length === 0 ? (
            <p className="mt-3 rounded-xl border border-dashed border-line p-5 text-muted">No reviews yet. Be the first to book and leave one.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {studio.reviews.map((r, i) => (
                <li key={i} className="card p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold">{r.name}</p>
                    <p className="inline-flex items-center gap-1 text-sm font-bold"><Star size={14} className="fill-accent text-accent" /> {r.rating}</p>
                  </div>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{r.comment}</p>
                  <p className="mt-2 text-xs text-muted">{r.date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <p className="text-3xl font-extrabold">${studio.hourlyRate}<span className="text-base font-semibold text-muted"> / hour</span></p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-3"><dt className="inline-flex items-center gap-2 text-muted"><ShieldCheck size={16} /> Security deposit</dt><dd className="font-bold">${studio.securityDeposit}</dd></div>
              <div className="flex justify-between gap-3"><dt className="inline-flex items-center gap-2 text-muted"><Users size={16} /> Max capacity</dt><dd className="font-bold">{studio.maxCapacity} people</dd></div>
            </dl>
            {isOwner ? (
              <div className="mt-6 space-y-3">
                <p className="rounded-xl bg-surface2 p-3 text-sm text-muted">This is your listing, so booking is turned off.</p>
                <Link href={`/studios/edit/${studio._id}`} className="btn btn-ghost w-full">Edit listing</Link>
              </div>
            ) : (
              <button type="button" className="btn btn-primary mt-6 w-full !py-3.5" onClick={onBook}>Book Workspace Now</button>
            )}
          </div>

          <div className="card mt-5 flex items-center gap-4 p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={studio.ownerPhoto || `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(studio.ownerName)}`} alt="" className="h-14 w-14 rounded-full border border-line object-cover" />
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Hosted by</p>
              <p className="truncate font-display text-lg font-semibold">{studio.ownerName}</p>
              <p className="truncate text-sm text-muted">{studio.ownerEmail}</p>
            </div>
          </div>
        </aside>
      </div>

      {booking && <BookingModal studio={studio} open={booking} onClose={() => setBooking(false)} onBooked={() => router.push("/my-bookings")} />}
    </div>
  );
}
