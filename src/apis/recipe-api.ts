import { useQuery } from "@tanstack/react-query";
import { API_PREFIX, BASEURL } from "./api-constant";
import axios from "axios";
import { type Meal, type Category, type MealSearchParams } from "../types/meal";

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

const resolveParams = (params: MealSearchParams) => {
  switch (params.type) {
    case "search":
      return {
        url: `${BASEURL}${API_PREFIX}search.php?s=${params.q}`,
        queryKey: ["meals", "search", params.q],
        transform: (meals: Meal[]) => meals,
      };
    case "area":
      return {
        url: `${BASEURL}${API_PREFIX}filter.php?a=${params.a}`,
        queryKey: ["meals", "area", params.a],
        transform: (meals: Meal[]) =>
          meals.map((meal) => ({
            ...meal,
            strArea: params.a,
            strCategory: "",
          })),
      };
    case "category":
      return {
        url: `${BASEURL}${API_PREFIX}filter.php?c=${params.c}`,
        queryKey: ["meals", "category", params.c],
        transform: (meals: Meal[]) =>
          meals.map((meal) => ({
            ...meal,
            strCategory: params.c,
            strArea: "",
          })),
      };
  }
};

export const useGetMeals = (params: MealSearchParams) => {
  const { url, queryKey, transform } = resolveParams(params);

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get(url);
      const meals = response.data.meals as Meal[];
      return meals ? transform(meals) : [];
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

// export const useGetMealOrigins = () => {
//   const APIURL = `${BASEURL}${API_PREFIX}list.php?a=list`;
//   return useQuery<Meal[], Error>({
//     queryKey: ["mealOrigins"],
//     queryFn: async () => {
//       const response = await axios.get(APIURL);
//       return response.data.meals;
//     },
//   });
// };
