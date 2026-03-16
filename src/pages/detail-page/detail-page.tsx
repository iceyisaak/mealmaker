import { useRouter } from "@tanstack/react-router";
import { useGetMealById } from "../../apis/recipe-api";
import { Route } from "../../routes/meal.$id";

import { IoArrowBackSharp } from "react-icons/io5";

export const DetailPage = () => {
  const { id } = Route.useParams();
  const { data: meal, isLoading, isError, error } = useGetMealById(id);
  const router = useRouter();

  if (isLoading) return <div>Loading recipe...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!meal) return <div>No meal found.</div>;

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}` as keyof typeof meal];
    const measure = meal[`strMeasure${i + 1}` as keyof typeof meal];
    return { ingredient, measure };
  }).filter(({ ingredient }) => ingredient && ingredient.trim() !== "");

  return (
    <div className="mx-[24vw] py-32 min-h-screen">
      <span
        onClick={() => router.history.back()}
        className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-900 cursor-pointer"
      >
        <IoArrowBackSharp /> Back
      </span>
      <h1 className="text-5xl mb-3">{meal.strMeal}</h1>
      <div>
        <p>
          <strong>Category:</strong> {meal.strCategory} |{" "}
          <strong>Origin:</strong> {meal.strArea}
        </p>

        <div className="flex flex-col md:flex-row gap-6 mt-4 mb-16">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="md:w-[700px] rounded-lg"
          />

          <div className="md:w-1/4">
            <h3 className="text-3xl mb-2">Ingredients</h3>
            <ul className="text-left space-y-1">
              {ingredients.map(({ ingredient, measure }) => (
                <li key={ingredient}>
                  {measure} {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="text-3xl mb-3">Instructions</h3>
        {meal.strInstructions
          .split(/\r\n|\n/)
          .filter(Boolean)
          .map((step, i) => (
            <p key={i} className="text-l mb-4">
              {step}
            </p>
          ))}

        <hr className="mt-14 mb-20" />
        {meal.strYoutube && (
          <iframe
            width="100%"
            height="560"
            src={`https://www.youtube.com/embed/${new URL(meal.strYoutube).searchParams.get("v")}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "4px", border: "none", marginTop: "12px" }}
          />
        )}
      </div>
    </div>
  );
};

export default DetailPage;
