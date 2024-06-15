import { Introduction, Welcome } from "@/pages";
import { RouteTypes } from "./types";
import { Navigate } from "react-router-dom";

export * from "./types";

export const ROUTES: ReadonlyArray<RouteTypes> = [
  {
    id: "redirect",
    path: "*",
    element: <Navigate to="/welcome" />,
  },
  {
    id: "welcome",
    path: "/welcome",
    element: <Welcome />,
    noFrame: true,
  },
  {
    id: "introduction",
    path: "/introduction",
    element: <Introduction />,
  },
];

export const noFrames: ReadonlyArray<RouteTypes["path"]> = ROUTES.filter(
  ({ noFrame }) => noFrame
).map(({ path }) => path);
