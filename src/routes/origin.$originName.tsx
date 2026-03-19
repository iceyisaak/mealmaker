import { createFileRoute } from "@tanstack/react-router";
import OriginBrowsePage from "../pages/origin-browse-page/origin-browse-page";

export const Route = createFileRoute("/origin/$originName")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OriginBrowsePage />;
}
