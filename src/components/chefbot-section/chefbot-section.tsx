import { VscRobot } from "react-icons/vsc";

export const ChefbotSection = () => {
  return (
    <section className="h-[70rem] relative overflow-hidden bg-[#181A1B] py-82 font-barlow">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Ambient amber glow on top of overlay */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_50%_50%,rgba(196,124,58,0.12)_0%,transparent_65%)]" />

      {/* Top fade from stone-cream above */}
      <div className="absolute top-0 left-0 right-0 h-24 [background:linear-gradient(to_bottom,var(--color-stone-cream),transparent)]" />

      <div className="relative flex flex-col items-center text-center px-6">
        {/* Eyebrow */}
        <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
          Need more inspiration?
        </span>

        {/* Title */}
        <h2 className="mb-4 font-playfair text-[clamp(28px,4vw,52px)] font-black leading-[1.05] tracking-tight text-stone-cream">
          Chat with our <em className="italic text-amber-brand">ChefBot</em>
        </h2>

        {/* Subtitle */}
        <p className="mb-10 max-w-sm text-[13.5px] font-light leading-relaxed text-stone-faint">
          Our AI-powered chef can suggest recipes, swap ingredients, and guide
          you through any dish.
        </p>

        {/* Divider */}
        <hr className="mb-10 h-0.5 w-15 border-none [background:linear-gradient(90deg,var(--color-amber-brand),var(--color-amber-light))]" />

        {/* CTA */}
        <button className="group flex h-14 w-64 cursor-pointer items-center justify-center gap-2.5 border border-amber-brand bg-transparent px-10 text-[13px] font-medium uppercase tracking-[0.2em] text-amber-brand transition-all duration-300 hover:bg-amber-brand hover:text-stone-cream">
          <VscRobot className="text-lg transition-transform duration-300 group-hover:rotate-12" />
          ChefBot
        </button>
      </div>
    </section>
  );
};

export default ChefbotSection;
