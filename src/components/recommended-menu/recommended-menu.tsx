import { Link } from "@tanstack/react-router";
import { useGetRecommendedMenu } from "../../apis/recipe-api";

export const RecommendedMenu = () => {
  const { data, error, isLoading } = useGetRecommendedMenu();
  return (
    <section className="h-[65rem] relative px-[5vw] py-20 bg-[#181A1B]">
      {/* Ambient glow behind the meal image */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_50%_60%,rgba(196,124,58,0.08)_0%,transparent_65%)]" />

      {/* Header */}
      <div className="relative mb-14 text-center">
        <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
          Tonight's Pick
        </span>
        <h2 className="font-playfair text-[clamp(32px,5vw,64px)] font-black leading-[1.05] tracking-tight text-stone-cream">
          Recommended <em className="italic text-amber-brand">Menu</em>
        </h2>
        <hr className="mx-auto mt-5 h-0.5 w-15 border-none [background:linear-gradient(90deg,var(--color-amber-brand),var(--color-amber-light))]" />
      </div>

      {/* Error */}
      {error && (
        <p className="py-10 text-center font-playfair text-xl italic text-red-400">
          Something went wrong — {error.message}
        </p>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="mx-auto flex w-fit flex-col items-center gap-4">
          <div className="size-[min(480px,80vw)] rounded-lg [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
          <div className="h-6 w-48 rounded [background:linear-gradient(90deg,#1f2223_25%,#252829_50%,#1f2223_75%)] [background-size:200%_100%] animate-shimmer" />
        </div>
      )}

      {/* Meal card */}
      {!isLoading && !error && data && (
        <div className="flex justify-center">
          <Link
            to="/meal/$id"
            params={{ id: data.idMeal }}
            className="group flex w-fit flex-col items-center"
          >
            {/* Glow ring behind image */}
            <div className="relative">
              <div className="absolute inset-0 scale-90 rounded-2xl bg-amber-brand/10 blur-2xl transition-all duration-700 group-hover:scale-105 group-hover:bg-amber-brand/20" />
              <img
                src={data.strMealThumb}
                alt={data.strMeal}
                className="relative mx-auto mb-6 w-[min(480px,80vw)] rounded-xl object-cover shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            {/* Meal name */}
            <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.25em] text-amber-brand">
              Featured Recipe
            </span>
            <h3 className="font-playfair text-2xl font-bold tracking-tight text-stone-cream transition-colors duration-200 group-hover:text-amber-light">
              {data.strMeal}
            </h3>
          </Link>
        </div>
      )}
    </section>
  );
};
export default RecommendedMenu;
