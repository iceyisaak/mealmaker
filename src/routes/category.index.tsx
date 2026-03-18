import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "../pages/catagory-page";

export const Route = createFileRoute("/category/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoryPage />;
}
