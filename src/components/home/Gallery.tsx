import credits from "@/data/credits.json";

const shots = [
  { src: credits.clothes.url, label: "Winter clothing, Chattogram" },
  { src: credits.blanket.url, label: "Blankets at Kamalapur station" },
  { src: credits.beach.url, label: "Beach cleanup volunteers" },
  { src: credits.plant.url, label: "Planting a sapling in Dhaka" },
  { src: credits.health.url, label: "Free health camp, Manikganj" },
  { src: credits.food.url, label: "Packing food for families" },
  { src: credits.brick.url, label: "Winter support, brickfield families" },
  { src: credits.rally.url, label: "Tree plantation rally, Mymensingh" },
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="eyebrow">From the field</p>
        <h2 className="section-title mt-3">Moments from community service</h2>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {shots.map((s) => (
          <figure key={s.src} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.label} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-10 text-xs font-semibold text-white sm:text-sm">{s.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
