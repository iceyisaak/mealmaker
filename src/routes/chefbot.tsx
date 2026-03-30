import { createFileRoute } from "@tanstack/react-router";
import { ChefbotPage } from "../pages/chefbot-page";

export const Route = createFileRoute("/chefbot")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChefbotPage />;
}
