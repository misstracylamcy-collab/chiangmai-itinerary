import { Route as rootRoute } from "./routes/__root";
import { Route as IndexRoute } from "./routes/index";

const IndexRouteWithChildren = IndexRoute.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
});

export const routeTree = rootRoute.addChildren([IndexRouteWithChildren]);
