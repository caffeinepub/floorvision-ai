import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import VisualizerPage from "./pages/VisualizerPage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const visualizerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizer",
  component: VisualizerPage,
});

const routeTree = rootRoute.addChildren([homeRoute, visualizerRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
