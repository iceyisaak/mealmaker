import { createFileRoute } from "@tanstack/react-router";
import { OriginPage } from "../pages/origin-page";

export const Route = createFileRoute("/origin")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OriginPage />;
}
