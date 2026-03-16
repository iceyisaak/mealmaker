import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../pages/home";

export const Route = createFileRoute("/")({
  component: Home,
});

// export const MealRoute = createFileRoute(`/meal/$id`)({
//   component: DetailPage,
// });
