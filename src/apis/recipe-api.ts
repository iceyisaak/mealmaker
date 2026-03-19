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

export const useGetMealOrigin = () => {
  const APIURL = `${BASEURL}${API_PREFIX}list.php?a=list`;
  return useQuery<Meal[], Error>({
    queryKey: ["mealOrigin"],
    queryFn: async () => {
      const response = await axios.get(APIURL);
      return response.data.meals;
    },
  });
};

export const useGetMeals = (q: string) => {
  const APIURL = `${BASEURL}${API_PREFIX}search.php?s=${q}`;

  return useQuery<Meal[], Error>({
    queryKey: ["meals", "search", q],
    queryFn: async () => {
      const response = await axios.get(APIURL);
      const meals = response.data.meals as Meal[];
      return meals ?? [];
    },
    staleTime: 5000,
  });
};

export const useGetMealsByCategory = (category: string) => {
  const APIURL = `${BASEURL}${API_PREFIX}filter.php?c=${category}`;

  return useQuery<Meal[], Error>({
    queryKey: ["meals", "category", category],
    queryFn: async () => {
      const response = await axios.get(APIURL);
      const meals = response.data.meals as Meal[];
      return meals
        ? meals.map((meal) => ({ ...meal, strCategory: category, strArea: "" }))
        : [];
    },
    staleTime: 5000,
  });
};

export const useGetMealsByOrigin = (origin: string) => {
  const url = `${BASEURL}${API_PREFIX}filter.php?a=${origin}`;

  return useQuery<Meal[], Error>({
    queryKey: ["meals", "origin", origin],
    queryFn: async () => {
      const response = await axios.get(url);
      const meals = response.data.meals as Meal[];
      return meals ? meals.map((meal) => ({ ...meal, strArea: origin })) : [];
    },
    staleTime: 5 * 60 * 1000,
  });
};
