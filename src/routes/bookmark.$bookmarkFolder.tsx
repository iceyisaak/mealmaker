import { createFileRoute } from "@tanstack/react-router";
import { BookmarkPage } from "../pages/bookmark-page";

export const Route = createFileRoute("/bookmark/$bookmarkFolder")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BookmarkPage />;
}
