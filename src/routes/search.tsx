import { createFileRoute } from "@tanstack/react-router";
import { ResultPage } from "../pages/result-page";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) ?? "",
  }),
});

function RouteComponent() {
  return <ResultPage />;
}
