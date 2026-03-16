import type { Meal } from "../../../types";

export const ResultCard = ({ meal }: { meal: Meal }) => (
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
