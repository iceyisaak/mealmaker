// routes/category.$categoryName.tsx
import { createFileRoute } from "@tanstack/react-router";
import { CategorySubPage } from "../pages/category-sub-page";

export const Route = createFileRoute("/category/$categoryName")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategorySubPage />;
}
