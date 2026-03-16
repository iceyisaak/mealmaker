import { SearchBar } from "../navbar/search-bar";
import { VscRobot } from "react-icons/vsc";
import coverVdo from "../../assets/cover-vdo.mp4";

const SearchSection = () => {
  return (
    <aside className="relative flex h-[60rem] w-full flex-col items-center justify-center overflow-hidden font-barlow">
      {/* Background Video */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={coverVdo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Layered overlay: dark base + amber glow at bottom bleeding into header */}
      <div className="absolute inset-0 z-10 bg-black/55" />
      <div className="absolute inset-0 z-10 [background:radial-gradient(ellipse_at_50%_100%,rgba(196,124,58,0.18)_0%,transparent_65%)]" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        {/* Eyebrow */}
        <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
          Discover Something Delicious
        </span>

        {/* Title */}
        <h1 className="mb-10 font-playfair text-[clamp(32px,5vw,64px)] font-black leading-[1.05] tracking-tight text-stone-cream">
          Find Your Next <em className="italic text-amber-brand">Favourite</em>
          <br />
          Recipe
        </h1>

        {/* Divider */}
        <hr className="mb-10 h-0.5 w-15 border-none [background:linear-gradient(90deg,var(--color-amber-brand),var(--color-amber-light))]" />

        <SearchBar />

        {/* CTA */}
        <p className="mt-8 mb-4 text-[13px] font-light uppercase tracking-[0.2em] text-stone-faint">
          or chat with our
        </p>

        <button className="group flex h-14 cursor-pointer items-center justify-center gap-2.5 border border-amber-brand bg-transparent px-10 text-[13px] font-medium uppercase tracking-[0.2em] text-amber-brand transition-all duration-300 hover:bg-amber-brand hover:text-stone-cream">
          <VscRobot className="text-lg transition-transform duration-300 group-hover:rotate-12" />
          ChefBot
        </button>
      </div>

      {/* Bottom fade into header bg */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-32 [background:linear-gradient(to_bottom,transparent,#181A1B)]" />
    </aside>
  );
};

export default SearchSection;
