// routes/category.$categoryName.tsx
import { createFileRoute } from "@tanstack/react-router";
import { CategoryBrowsePage } from "../pages/category-browse-page";

export const Route = createFileRoute("/category/$categoryName")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoryBrowsePage />;
}
