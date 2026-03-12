import { useQuery } from "@tanstack/react-query";
import { API_PREFIX, BASEURL } from "./api-constant";
import axios from "axios";
import { type Meal } from "../types/meal";

export const getSurpriseMeal = () => {
  const APIURL = `${BASEURL}${API_PREFIX}random.php`;
  return useQuery<Meal, Error>({
    queryKey: ["surpriseMeal"],
    queryFn: async () => {
      const response = await axios.get(APIURL);
      return response.data.meals[0] as Meal;
    },
  });
};
