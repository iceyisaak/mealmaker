import { createFileRoute } from "@tanstack/react-router";
import { DetailPage } from "../pages/detail-page";

export const Route = createFileRoute("/meal/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DetailPage />;
}
