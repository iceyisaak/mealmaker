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
      <div className="bg-surface-card rounded-lg overflow-hidden hover:bg-surface-hover transition-all duration-300 cursor-pointer h-full flex flex-col border border-stone-warm/10">
        <div className="relative h-48 flex-shrink-0 overflow-hidden">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-playfair text-lg font-semibold text-white mb-1 line-clamp-1">
            {recipe.strMeal}
          </h3>
          <p className="font-barlow text-sm text-stone-muted">
            {recipe.strArea} • {recipe.strCategory}
          </p>
        </div>
      </div>
    </Link>
  );
};
