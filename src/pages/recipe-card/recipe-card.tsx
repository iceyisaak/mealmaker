import { Link } from "@tanstack/react-router";
import type { Meal } from "../../types";

interface RecipeCardProps {
  recipe: Meal;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link
      to="/meal/$id"
      params={{
        id: recipe.idMeal,
      }}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <div className="relative h-48 flex-shrink-0">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
            {recipe.strMeal}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {recipe.strArea} • {recipe.strCategory}
          </p>
        </div>
      </div>
    </Link>
  );
};
