import { useState } from "react";
import { useGetMealOrigin } from "../../apis/recipe-api"; // adjust path as needed

const REGION_MAP: Record<string, string> = {
  Algerian: "Africa",
  Moroccan: "Africa",
  Egyptian: "Africa",
  Tunisian: "Africa",
  Kenyan: "Africa",
  American: "Americas",
  Canadian: "Americas",
  Argentinian: "Americas",
  Jamaican: "Americas",
  Mexican: "Americas",
  Uruguayan: "Americas",
  Venezulan: "Americas",
  British: "Europe",
  Croatian: "Europe",
  Dutch: "Europe",
  French: "Europe",
  Greek: "Europe",
  Irish: "Europe",
  Italian: "Europe",
  Norwegian: "Europe",
  Polish: "Europe",
  Portuguese: "Europe",
  Russian: "Europe",
  Slovakian: "Europe",
  Spanish: "Europe",
  Ukrainian: "Europe",
  Chinese: "Asia",
  Filipino: "Asia",
  Indian: "Asia",
  Japanese: "Asia",
  Malaysian: "Asia",
  Syrian: "Asia",
  Thai: "Asia",
  Turkish: "Asia",
  Vietnamese: "Asia",
  "Saudi Arabian": "Middle East",
  Australian: "Oceania",
};

const EMOJI_MAP: Record<string, string> = {
  Algerian: "🇩🇿",
  American: "🇺🇸",
  Argentinian: "🇦🇷",
  Australian: "🇦🇺",
  British: "🇬🇧",
  Canadian: "🇨🇦",
  Chinese: "🇨🇳",
  Croatian: "🇭🇷",
  Dutch: "🇳🇱",
  Egyptian: "🇪🇬",
  Filipino: "🇵🇭",
  French: "🇫🇷",
  Greek: "🇬🇷",
  Indian: "🇮🇳",
  Irish: "🇮🇪",
  Italian: "🇮🇹",
  Jamaican: "🇯🇲",
  Japanese: "🇯🇵",
  Kenyan: "🇰🇪",
  Malaysian: "🇲🇾",
  Mexican: "🇲🇽",
  Moroccan: "🇲🇦",
  Norwegian: "🇳🇴",
  Polish: "🇵🇱",
  Portuguese: "🇵🇹",
  Russian: "🇷🇺",
  "Saudi Arabian": "🇸🇦",
  Slovakian: "🇸🇰",
  Spanish: "🇪🇸",
  Syrian: "🇸🇾",
  Thai: "🇹🇭",
  Tunisian: "🇹🇳",
  Turkish: "🇹🇷",
  Ukrainian: "🇺🇦",
  Uruguayan: "🇺🇾",
  Venezulan: "🇻🇪",
  Vietnamese: "🇻🇳",
};

// Tailwind doesn't support dynamic class names — use inline style only for dynamic colors
const REGION_COLORS: Record<
  string,
  { accent: string; dotGlow: string; cardBg: string; border: string }
> = {
  Africa: {
    accent: "#E8823A",
    dotGlow: "#E8823A55",
    cardBg: "rgba(232,130,58,0.08)",
    border: "#E8823A55",
  },
  Americas: {
    accent: "#3BAF74",
    dotGlow: "#3BAF7455",
    cardBg: "rgba(59,175,116,0.08)",
    border: "#3BAF7455",
  },
  Europe: {
    accent: "#4F7FD4",
    dotGlow: "#4F7FD455",
    cardBg: "rgba(79,127,212,0.08)",
    border: "#4F7FD455",
  },
  Asia: {
    accent: "#D9415A",
    dotGlow: "#D9415A55",
    cardBg: "rgba(217,65,90,0.08)",
    border: "#D9415A55",
  },
  "Middle East": {
    accent: "#9B5FCA",
    dotGlow: "#9B5FCA55",
    cardBg: "rgba(155,95,202,0.08)",
    border: "#9B5FCA55",
  },
  Oceania: {
    accent: "#1BAFC8",
    dotGlow: "#1BAFC855",
    cardBg: "rgba(27,175,200,0.08)",
    border: "#1BAFC855",
  },
};

const ALL_REGIONS = [
  "All",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Middle East",
  "Oceania",
];

export const OriginPage = () => {
  const { data: meals = [], isLoading, error } = useGetMealOrigin();

  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = meals.filter((m) => {
    const region = REGION_MAP[m.strArea] ?? "Other";
    const matchesRegion = activeRegion === "All" || region === activeRegion;
    const matchesSearch = m.strArea
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F0D0A] flex items-center justify-center">
        <div className="text-center font-sans">
          <p className="text-[#E8823A] text-lg mb-2">Failed to load cuisines</p>
          <p className="text-white/30 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0D0A] text-[#EDE8DF] font-serif">
      {/* Hero Header */}
      <header className="relative overflow-hidden px-12 pt-16 pb-10 border-b border-white/[0.07]">
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute -top-20 -left-14 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,130,58,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-mono text-[11px] tracking-[4px] uppercase text-[#E8823A]">
              World Cuisine Explorer
            </span>
            <span className="font-mono text-[11px] text-white/30">
              {meals.length} origins
            </span>
          </div>

          <h1 className="text-[clamp(36px,6vw,80px)] font-normal leading-[1.05] tracking-tight mb-6 text-[#EDE8DF]">
            Flavours of
            <br />
            <em className="italic text-[#E8823A]">the World</em>
          </h1>

          <p className="font-sans text-[15px] text-[#EDE8DF]/50 max-w-[480px] leading-relaxed">
            Discover cuisines from every corner of the globe. Each card
            represents a rich culinary tradition waiting to be explored.
          </p>
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-6 px-12 py-7 border-b border-white/[0.05]">
        {/* Search */}
        <div className="relative shrink-0">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-white/30 pointer-events-none">
            ⌕
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cuisine..."
            className="
              w-56 bg-white/5 border border-white/10 rounded-lg
              pl-9 pr-3.5 py-2.5
              text-sm font-sans text-[#EDE8DF]
              placeholder:text-white/25
              outline-none focus:border-white/25 transition-colors
            "
          />
        </div>

        {/* Region filters */}
        <div className="flex flex-wrap gap-2">
          {ALL_REGIONS.map((r) => {
            const isActive = activeRegion === r;
            const color = r !== "All" ? REGION_COLORS[r]?.accent : "#E8823A";
            return (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className="rounded-full px-4 py-2 text-[12px] font-sans tracking-wide transition-all duration-200 cursor-pointer"
                style={{
                  border: `1px solid ${isActive ? color : "rgba(255,255,255,0.1)"}`,
                  background: isActive ? `${color}22` : "transparent",
                  color: isActive ? color : "rgba(237,232,223,0.5)",
                }}
              >
                {r}
              </button>
            );
          })}
        </div>

        <span className="ml-auto font-mono text-[12px] text-white/30">
          {filtered.length} results
        </span>
      </div>

      {/* Grid */}
      <main className="px-12 py-10 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-white/[0.04] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3.5">
            {filtered.map((meal) => {
              const region = REGION_MAP[meal.strArea] ?? "Other";
              const colors = REGION_COLORS[region] ?? REGION_COLORS["Africa"];
              const emoji = EMOJI_MAP[meal.strArea] ?? "🌍";
              const isHov = hovered === meal.strArea;

              return (
                <div
                  key={meal.strArea}
                  onMouseEnter={() => setHovered(meal.strArea)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex flex-col gap-3 rounded-2xl p-6 cursor-pointer relative overflow-hidden transition-all duration-200"
                  style={{
                    background: isHov
                      ? colors.cardBg
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isHov ? colors.border : "rgba(255,255,255,0.07)"}`,
                    transform: isHov ? "translateY(-3px)" : "none",
                    boxShadow: isHov ? `0 8px 32px ${colors.dotGlow}` : "none",
                  }}
                >
                  {/* Top row */}
                  <div className="flex justify-between items-start">
                    <span className="text-[32px] leading-none">{emoji}</span>
                    <span
                      className="w-2 h-2 rounded-full mt-1 transition-all duration-200"
                      style={{
                        background: colors.accent,
                        boxShadow: isHov ? `0 0 8px ${colors.accent}` : "none",
                      }}
                    />
                  </div>

                  {/* Name + region */}
                  <div>
                    <p className="text-base font-normal text-[#EDE8DF] tracking-tight mb-1">
                      {meal.strArea}
                    </p>
                    <p
                      className="text-[10px] tracking-[2px] uppercase font-mono"
                      style={{ color: colors.accent }}
                    >
                      {region}
                    </p>
                  </div>

                  {/* Hover CTA */}
                  <p
                    className="text-[11px] font-sans flex items-center gap-1 transition-opacity duration-200"
                    style={{
                      color: colors.accent,
                      opacity: isHov ? 1 : 0,
                    }}
                  >
                    Explore recipes →
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-20 font-sans text-[15px] text-white/30">
            No cuisines found for &ldquo;{search}&rdquo;
          </div>
        )}
      </main>
    </div>
  );
};
