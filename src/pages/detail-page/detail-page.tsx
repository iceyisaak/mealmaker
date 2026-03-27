import { useRouter } from "@tanstack/react-router";
import { useGetMealById } from "../../apis/recipe-api";
import { Route } from "../../routes/meal.$id";
import { IoArrowBackSharp } from "react-icons/io5";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useBookmarkRecipe } from "../../features/store/useBookmarkRecipe";

export const DetailPage = () => {
  const { id } = Route.useParams();
  const { data: meal, isLoading, isError, error } = useGetMealById(id);
  const router = useRouter();

  const saveRecipe = useBookmarkRecipe((s) => s.saveRecipe);
  const removeRecipe = useBookmarkRecipe((s) => s.removeRecipe);
  const isBookmarked = useBookmarkRecipe((s) => s.isBookmarked(id));

  const handleBookmark = () => {
    isBookmarked ? removeRecipe(id) : saveRecipe(id);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#181A1B] font-barlow">
        <p className="font-playfair text-xl italic text-stone-faint animate-pulse">
          Preparing your recipe…
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#181A1B] font-barlow">
        <p className="font-playfair text-xl italic text-red-400">
          {error.message}
        </p>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#181A1B] font-barlow">
        <p className="font-playfair text-xl italic text-stone-faint">
          No meal found.
        </p>
      </div>
    );
  }

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}` as keyof typeof meal];
    const measure = meal[`strMeasure${i + 1}` as keyof typeof meal];
    return { ingredient, measure };
  }).filter(({ ingredient }) => ingredient && ingredient.trim() !== "");

  const steps = meal.strInstructions.split(/\r\n|\n/).filter(Boolean);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#181A1B] font-barlow">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_70%_10%,rgba(196,124,58,0.07)_0%,transparent_55%),radial-gradient(circle_at_20%_80%,rgba(196,124,58,0.05)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-28">
        {/* Back link + Bookmark */}
        <div className="mb-10 flex items-center justify-between">
          <button
            onClick={() => router.history.back()}
            className="group cursor-pointer flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-faint transition-colors hover:text-amber-brand"
          >
            <IoArrowBackSharp className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back
          </button>

          <button
            onClick={handleBookmark}
            aria-label={
              isBookmarked ? "Remove bookmark" : "Bookmark this recipe"
            }
            className="group flex cursor-pointer items-center gap-2 rounded-full border border-amber-brand/20 bg-amber-brand/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-faint transition-all duration-200 hover:border-amber-brand/50 hover:bg-amber-brand/10 hover:text-amber-brand"
          >
            {isBookmarked ? (
              <BsBookmarkFill className="text-amber-brand transition-transform duration-200 group-hover:scale-110" />
            ) : (
              <BsBookmark className="transition-transform duration-200 group-hover:scale-110" />
            )}
            {isBookmarked ? "Saved" : "Save Recipe"}
          </button>
        </div>

        {/* Title block */}
        <div className="mb-10">
          <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
            {meal.strArea} · {meal.strCategory}
          </span>
          <h1 className="font-playfair text-[clamp(32px,5vw,64px)] font-black leading-[1.05] tracking-tight text-stone-cream">
            {meal.strMeal}
          </h1>
          <hr className="mt-5 h-0.5 w-15 border-none [background:linear-gradient(90deg,var(--color-amber-brand),var(--color-amber-light))]" />
        </div>

        {/* Image + Ingredients */}
        <div className="mb-20 flex flex-col gap-8 md:flex-row">
          <div className="md:flex-1">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full rounded object-cover shadow-[0_8px_40px_rgba(0,0,0,0.5)] ring-1 ring-amber-brand/15"
            />
          </div>

          {/* Ingredients */}
          <div className="md:w-64 lg:w-72">
            <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.25em] text-amber-brand">
              You'll need
            </span>
            <h2 className="mb-5 font-playfair text-2xl font-bold text-stone-cream">
              Ingredients
            </h2>
            <ul className="space-y-2">
              {ingredients.map(({ ingredient, measure }) => (
                <li
                  key={ingredient as string}
                  className="flex items-baseline justify-between gap-3 border-b border-amber-brand/8 pb-2 text-sm"
                >
                  <span className="font-medium text-stone-cream">
                    {ingredient as string}
                  </span>
                  <span className="shrink-0 text-[12px] text-stone-faint">
                    {measure as string}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-20">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.25em] text-amber-brand">
            How to make it
          </span>
          <h2 className="mb-8 font-playfair text-2xl font-bold text-stone-cream">
            Instructions
          </h2>
          <div className="space-y-5">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <span className="mt-0.5 shrink-0 font-playfair text-[13px] font-bold italic text-amber-brand/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] font-light leading-relaxed text-stone-muted">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="mb-16 border-none h-px [background:linear-gradient(90deg,transparent,rgba(196,124,58,0.3),transparent)]" />

        {/* YouTube embed */}
        {meal.strYoutube && (
          <div>
            <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.25em] text-amber-brand">
              Watch & Learn
            </span>
            <h2 className="mb-5 font-playfair text-2xl font-bold text-stone-cream">
              Video Guide
            </h2>
            <div className="overflow-hidden rounded ring-1 ring-amber-brand/15 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              <iframe
                width="100%"
                height="560"
                src={`https://www.youtube.com/embed/${new URL(meal.strYoutube).searchParams.get("v")}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="block border-0"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailPage;
