import { useQuery } from "@tanstack/react-query";
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

export const useGetMeals = (searchTerm: string) => {
  const APIURL = `${BASEURL}${API_PREFIX}search.php?s=${searchTerm}`;

  return useQuery({
    queryKey: ["meals", searchTerm],
    queryFn: async () => {
      const response = await axios.get(APIURL);
      return response.data.meals as Meal[];
    },
    staleTime: 5000,
  });
};

export const useGetMealById = (id: string) => {
  const APIURL = `${BASEURL}${API_PREFIX}lookup.php?i=${id}`;

  return useQuery({
    queryKey: ["meal", id],

    queryFn: async () => {
      const response = await axios.get(APIURL);
      return response.data.meals[0] as Meal;
    },

    enabled: !!id,
    staleTime: 5000,
  });
};
