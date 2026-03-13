import { useQuery } from "@tanstack/react-query";
import { API_PREFIX, BASEURL } from "./api-constant";
import axios from "axios";
import { type Meal, type Category } from "../types/meal";

export const getRecommendedMenu = () => {
  const APIURL = `${BASEURL}${API_PREFIX}random.php`;
  return useQuery<Meal, Error>({
    queryKey: ["recommendedMenu"],
    queryFn: async () => {
      const response = await axios.get(APIURL);
      return response.data.meals[0] as Meal;
    },
  });
};

export const getMealCategories = () => {
  const APIURL = `${BASEURL}${API_PREFIX}categories.php`;
  return useQuery<Category[], Error>({
    queryKey: ["mealCategories"],
    queryFn: async () => {
      const response = await axios.get(APIURL);
      return response.data.categories;
    },
  });
};
