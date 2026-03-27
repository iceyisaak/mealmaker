import { OriginCard } from "../origin-card";
import { SkeletonCard } from "../skeleton-card";
import { useGetMealsByOrigin } from "../../../apis/recipe-api";

export const CardGrid = ({ origin }: { origin: string }) => {
  const {
    data: meals,
    isLoading,
    isFetching,
    isError,
  } = useGetMealsByOrigin(origin);

  console.log("[MealGrid]", { origin, isLoading, isFetching, isError, meals });

  if (isLoading || isFetching)
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} i={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-[15px] text-red-600">
        <span className="text-2xl">⚠</span>
        Failed to load meals. Please try again.
      </div>
    );

  if (!meals?.length)
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-[15px] text-stone-400">
        <span className="text-2xl">🍽</span>
        No meals found for this origin.
      </div>
    );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
      {meals.map((meal, i) => (
        <OriginCard key={meal.idMeal} meal={meal} index={i} />
      ))}
    </div>
  );
};
