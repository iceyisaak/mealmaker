// src/pages/result-page.tsx
import { Link } from "@tanstack/react-router";
import { useGetMeals } from "../../apis/recipe-api";
import { Route } from "../../routes/search";
import { ResultCard } from "./result-card";
import { SearchBar } from "../../components/navbar/search-bar";

export const ResultPage = () => {
  const { q } = Route.useSearch();
  const { data: meals, isLoading, isError } = useGetMeals(q);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-200 py-10 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Results for <span className="text-amber-600">"{q}"</span>
        </h1>
        <div className="flex justify-center">
          <SearchBar defaultValue={q} />
        </div>
      </div>

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
                  <ResultCard key={meal.idMeal} meal={meal} />
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
