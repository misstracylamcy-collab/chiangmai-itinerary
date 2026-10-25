import { createFileRoute } from "@tanstack/react-router";
import { ItineraryApp } from "../components/itinerary-app";

export const Route = createFileRoute("/")({
  component: () => <ItineraryApp />,
});
