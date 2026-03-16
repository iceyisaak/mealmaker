// src/pages/result-page.tsx
import { Link, useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/search";
import { useGetMeals } from "../../apis/recipe-api";
import { type Meal } from "../../types";

const MealCard = ({ meal }: { meal: Meal }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <div className="relative overflow-hidden h-48">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
      <span className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
        {meal.strCategory}
      </span>
    </div>
    <div className="p-4 flex flex-col flex-1">
      <h3 className="font-bold text-lg text-gray-800 mb-1">{meal.strMeal}</h3>
      <p className="text-sm text-gray-500 mb-3">{meal.strArea} Cuisine</p>
    </div>
  </div>
);

export const ResultPage = () => {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const { data: meals, isLoading, isError } = useGetMeals(q);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-200 py-10 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Results for <span className="text-amber-600">"{q}"</span>
        </h1>
        <button
          onClick={() => navigate({ to: "/" })}
          className="text-sm text-blue-700 underline hover:text-blue-900"
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" />
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 text-lg">
            Something went wrong. Please try again.
          </div>
        )}

        {!isLoading && !isError && (!meals || meals.length === 0) && (
          <div className="text-center text-gray-500 text-lg">
            No recipes found for "{q}". Try a different search term.
          </div>
        )}

        {meals && meals.length > 0 && (
          <>
            <p className="text-gray-500 mb-6">{meals.length} recipe(s) found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <Link to="/meal/$id" params={{ id: meal.idMeal }}>
                  <MealCard key={meal.idMeal} meal={meal} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
