import { createFileRoute } from "@tanstack/react-router";
import { ResultPage } from "../pages/result-page";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: (
    search: Record<string, unknown>,
  ): { q?: string; a?: string; c?: string } => ({
    ...(search.q ? { q: search.q as string } : {}),
    ...(search.a ? { a: search.a as string } : {}),
    ...(search.c ? { c: search.c as string } : {}),
  }),
});

function RouteComponent() {
  return <ResultPage />;
}
