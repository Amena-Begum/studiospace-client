"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import credits from "@/data/credits.json";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    scene: "Scene 01",
    kicker: "Photo studios",
    title: "Find the set that makes the shot.",
    text: "Styled sets, daylight lofts and lit corners, booked by the hour and ready when you walk in.",
    image: credits.carousel.url,
    alt: "A whitewashed photo-shoot courtyard set with a vintage carousel and arched windows",
    cat: "Photo Studio",
  },
  {
    scene: "Scene 02",
    kicker: "Film & sound stages",
    title: "Roll camera on a stage with the lights already hung.",
    text: "Green-screen bays, rigged grids and crew-friendly layouts for shows, shorts and ads.",
    image: credits.greenroom.url,
    alt: "A green-screen set with two blue velvet sofas and softbox lighting",
    cat: "Film Stage",
  },
  {
    scene: "Scene 03",
    kicker: "Music suites",
    title: "Track the record where the room already sounds right.",
    text: "Control rooms with real consoles, live rooms and engineers on request.",
    image: credits.control.url,
    alt: "A recording studio control room with a large mixing console and warm red lighting",
    cat: "Music Suite",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <section aria-label="Featured studio types" className="relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, A11y]}
        effect="fade"
        loop
        autoplay={{ delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSwiper={setSwiper}
        onSlideChange={(s) => setActive(s.realIndex)}
        speed={700}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.scene}>
            <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
              <div className="flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-muted">
                <span className="rounded border border-ink px-2 py-1 text-ink">{s.scene}</span>
                <span>Take {i + 1}</span>
                <span className="h-px flex-1 bg-line" />
                <span className="hidden sm:inline">{s.kicker}</span>
              </div>
              <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.35rem,6.4vw,5.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">{s.title}</h1>

              <div className="relative mt-8 overflow-hidden rounded-[1.6rem] border border-line bg-surface2 shadow-[var(--shadow)] grain">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.alt} className="h-[300px] w-full object-cover sm:h-[420px] lg:h-[500px]" fetchPriority={i === 0 ? "high" : "auto"} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                  <p className="max-w-md text-[1.02rem] leading-relaxed text-white">{s.text}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/studios" className="btn btn-primary">
                      Explore Studios <ArrowUpRight size={17} />
                    </Link>
                    <Link href="/studios" className="btn border-[1.5px] border-white text-white hover:bg-white hover:text-black">
                      Host Your Space
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pb-2 sm:px-6" role="tablist" aria-label="Choose a slide">
        {slides.map((s, i) => (
          <button
            key={s.scene}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => swiper?.slideToLoop(i)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${active === i ? "border-accent bg-accent text-accentink" : "border-line text-muted hover:border-ink hover:text-ink"}`}
          >
            {s.scene}
          </button>
        ))}
      </div>
    </section>
  );
}
