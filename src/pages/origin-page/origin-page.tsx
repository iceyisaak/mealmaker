import { useState } from "react";
import { MealGrid } from "./card-grid/card-grid";
import { ORIGINS } from "../../apis/origin.constants";

// ─── Page ─────────────────────────────────────────────────────────────────────
export const OriginPage = () => {
  const [selected, setSelected] = useState<string>("Italian");
  const currentOrigin = ORIGINS.find((o) => o.id === selected)!;

  return (
    <div className="min-h-screen bg-[#f7f3ed] text-stone-900">
      {/* Keyframes + font — only what Tailwind can't handle */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif !important; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <header className="relative bg-[#1a1209] overflow-hidden px-10 pt-16 pb-14 md:px-12 md:pt-20 md:pb-16">
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />

        <div className="relative z-10 max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#b8a899] mb-4">
            World Kitchen
          </p>
          <h1 className="font-serif text-[clamp(3rem,6vw,5.25rem)] leading-[1.05] font-bold text-[#f7f3ed]">
            Browse by
            <br />
            <em className="not-italic text-[#e8c88a]">Origin</em>
          </h1>
          <p className="mt-5 text-[15px] font-light text-[#a89b8c] leading-relaxed">
            Explore authentic recipes from {ORIGINS.length} cuisines around the
            globe.
          </p>
        </div>

        {/* Dynamic accent bar */}
        <div
          className="absolute left-0 bottom-0 w-full h-1 transition-colors duration-500"
          style={{ backgroundColor: currentOrigin.accent }}
        />
      </header>

      {/* ── Origin Nav ───────────────────────────────────────────────────────── */}
      <nav
        aria-label="Filter by cuisine origin"
        className="sticky top-0 z-50 bg-[#f0ebe3] border-b border-[#e8ddd0]
                   overflow-x-auto no-scrollbar"
      >
        <div className="flex gap-1.5 px-10 py-3.5 w-max">
          {ORIGINS.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              aria-pressed={selected === o.id}
              className={[
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border",
                "text-[13px] whitespace-nowrap transition-all duration-150 cursor-pointer",
                selected === o.id
                  ? "bg-[#1a1209] text-[#f7f3ed] border-[#1a1209] font-medium shadow-md"
                  : "bg-transparent text-stone-500 border-transparent hover:bg-[#e8ddd0] hover:text-stone-800",
              ].join(" ")}
            >
              <span className="text-[15px] leading-none">{o.emoji}</span>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ── Results ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-10 pt-12 pb-20">
        {/* Section header */}
        <header className="flex items-center gap-5 mb-10">
          <span
            className="text-[44px] leading-none flex-shrink-0 transition-[color] duration-500"
            style={{ color: currentOrigin.accent }}
          >
            {currentOrigin.emoji}
          </span>

          <div>
            <h2 className="font-serif text-[32px] font-bold tracking-tight text-stone-900">
              {currentOrigin.label} Cuisine
            </h2>
            <p className="text-[13px] text-stone-400 font-light mt-0.5">
              Handpicked traditional recipes
            </p>
          </div>

          <div
            className="flex-1 h-0.5 rounded-full opacity-30 transition-colors duration-500"
            style={{ backgroundColor: currentOrigin.accent }}
          />
        </header>

        <MealGrid origin={selected} />
      </section>
    </div>
  );
};

export default OriginPage;
