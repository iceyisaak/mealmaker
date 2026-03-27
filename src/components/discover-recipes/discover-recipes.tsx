import { Link } from "@tanstack/react-router";

export const DiscoverRecipes = () => {
  const cards = [
    {
      label: "By Culinary Category",
      icon: "🥩",
      description:
        "Browse meals grouped by type — pasta, seafood, desserts and more.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      to: "/category",
    },
    {
      label: "By Culinary Origin",
      icon: "🌍",
      description:
        "Explore cuisines from around the world, from Italian to Japanese.",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      to: "/origin",
    },
  ];

  return (
    <section className="h-[70rem] bg-stone-cream py-62 px-12 font-barlow relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_10%_20%,rgba(210,160,80,0.07)_0%,transparent_50%),radial-gradient(circle_at_90%_80%,rgba(180,100,60,0.07)_0%,transparent_50%)]" />

      {/* Header */}
      <div className="relative mb-16 text-center">
        <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
          Find What You're Craving
        </span>
        <h2 className="mb-5 font-playfair text-[clamp(36px,5vw,64px)] font-black leading-[1.05] tracking-tight text-ink">
          Discover <em className="italic text-amber-brand">Recipes</em>
        </h2>
        <hr className="mx-auto h-0.5 w-15 border-none [background:linear-gradient(90deg,var(--color-amber-brand),var(--color-amber-light))]" />
      </div>

      {/* Cards */}
      <div className="relative mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row">
        {cards.map(({ label, icon, description, image, to }) => (
          <Link
            key={label}
            to={to}
            className="group relative flex flex-1 cursor-pointer flex-col items-center justify-end overflow-hidden rounded shadow-[0_2px_12px_rgba(30,15,0,0.15)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(30,15,0,0.25)] min-h-[280px]"
          >
            {/* Background image */}
            <img
              src={image}
              alt={label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />

            {/* Gradient overlay — stronger at bottom for text legibility */}
            <div className="absolute inset-0 [background:linear-gradient(180deg,rgba(24,26,27,0.25)_0%,rgba(24,26,27,0.82)_100%)] transition-opacity duration-300 group-hover:[background:linear-gradient(180deg,rgba(24,26,27,0.15)_0%,rgba(24,26,27,0.88)_100%)]" />

            {/* Amber tint on hover */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(ellipse_at_50%_120%,rgba(196,124,58,0.18)_0%,transparent_70%)]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-3 px-8 pb-8 pt-6 text-center">
              <span className="text-3xl">{icon}</span>
              <h3 className="font-playfair text-xl font-bold leading-tight tracking-tight text-stone-cream">
                {label}
              </h3>
              <p className="text-[12.5px] font-light leading-relaxed text-stone-cream/70">
                {description}
              </p>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-amber-brand opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                Browse →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DiscoverRecipes;
