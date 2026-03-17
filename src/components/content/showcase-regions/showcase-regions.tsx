import { useGetMealOrigin } from "../../../apis/recipe-api";

export const ShowcaseRegions = () => {
  const { data, error, isLoading } = useGetMealOrigin();

  const FLAGS: Record<string, string> = {
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

  const REGIONS: Record<string, string> = {
    Algerian: "North Africa",
    American: "North America",
    Argentinian: "South America",
    Australian: "Oceania",
    British: "Europe",
    Canadian: "North America",
    Chinese: "East Asia",
    Croatian: "Europe",
    Dutch: "Europe",
    Egyptian: "North Africa",
    Filipino: "Southeast Asia",
    French: "Europe",
    Greek: "Europe",
    Indian: "South Asia",
    Irish: "Europe",
    Italian: "Europe",
    Jamaican: "Caribbean",
    Japanese: "East Asia",
    Kenyan: "East Africa",
    Malaysian: "Southeast Asia",
    Mexican: "North America",
    Moroccan: "North Africa",
    Norwegian: "Europe",
    Polish: "Europe",
    Portuguese: "Europe",
    Russian: "Europe",
    "Saudi Arabian": "Middle East",
    Slovakian: "Europe",
    Spanish: "Europe",
    Syrian: "Middle East",
    Thai: "Southeast Asia",
    Tunisian: "North Africa",
    Turkish: "Middle East",
    Ukrainian: "Europe",
    Uruguayan: "South America",
    Venezulan: "South America",
    Vietnamese: "Southeast Asia",
  };

  return (
    <section className="bg-stone-cream px-12 py-24 font-barlow">
      {/* Header */}
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <span className="mb-2.5 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
            A World of Flavour
          </span>
          <h2 className="font-playfair text-[clamp(32px,4vw,52px)] font-black leading-[1.05] tracking-tight text-ink">
            Cuisines From
            <br />
            <em className="italic text-amber-brand">Every Corner</em>
          </h2>
        </div>
        {data && (
          <div className="pb-1.5 text-right">
            <span className="block font-playfair text-[32px] font-bold leading-none text-ink">
              {data.length}
            </span>
            <span className="text-[13px] text-stone-muted">
              cuisines &amp; counting
            </span>
          </div>
        )}
      </div>

      <hr className="mb-8 border-none border-t border-stone-200/60 h-px bg-stone-200/60" />

      {/* Error */}
      {error && (
        <p className="py-20 text-center font-playfair text-[22px] italic text-red-600">
          Something went wrong — {error.message}
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-0.5">
        {isLoading &&
          Array.from({ length: 37 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-md p-3.5">
              <div className="shimmer h-7 w-7 shrink-0 rounded" />
              <div className="flex flex-col gap-1.5">
                <div className="shimmer h-3.5 w-20 rounded-sm" />
                <div className="shimmer h-2.5 w-14 rounded-sm" />
              </div>
            </div>
          ))}

        {!isLoading &&
          !error &&
          data?.map(({ strArea }) => (
            <div
              key={strArea}
              className="group flex cursor-pointer items-center gap-2.5 rounded-md border border-transparent p-3.5 transition-colors duration-150 hover:border-stone-200/60 hover:bg-stone-warm"
            >
              <span className="text-[22px] leading-none">
                {FLAGS[strArea] ?? "🍽️"}
              </span>
              <div>
                <p className="text-[14px] font-medium leading-snug text-ink">
                  {strArea}
                </p>
                <p className="text-[11px] text-stone-muted">
                  {REGIONS[strArea] ?? "World"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
