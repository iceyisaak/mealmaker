import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { API_PREFIX, BASEURL } from "./api-constant";
import axios from "axios";
import { type Meal, type Category } from "../types/meal";

export const useGetRecommendedMenu = () => {
  const APIURL = `${BASEURL}${API_PREFIX}random.php`;
  return useQuery<Meal, Error>({
    queryKey: ["recommendedMenu"],
    queryFn: async () => {
      const response = await axios.get(APIURL);
      return response.data.meals[0] as Meal;
    },
  });
};

export const useGetMealCategories = () => {
  const APIURL = `${BASEURL}${API_PREFIX}categories.php`;
  return useQuery<Category[], Error>({
    queryKey: ["mealCategories"],
    queryFn: async () => {
      const response = await axios.get(APIURL);
      return response.data.categories;
    },
  });
};

export const useGetMeals = (page: number, searchTerm: string = "Arrabiata") => {
  // 1. Incorporate 'page' into the API URL (if the API supports it)
  // Note: MealDB is limited, but this is the standard pattern:
  const APIURL = `${BASEURL}${API_PREFIX}search.php?s=${searchTerm}&p=${page}`;

  return useQuery({
    // 2. IMPORTANT: The queryKey must change when the page changes
    queryKey: ["meals", searchTerm, page],

    queryFn: async () => {
      const response = await axios.get(APIURL);
      return response.data.meals as Meal[];
    },

    // 3. Keep the old data on screen while fetching the new page
    placeholderData: keepPreviousData,

    // 4. Optimization: Don't garbage collect page data too quickly
    staleTime: 5000,
  });
};
