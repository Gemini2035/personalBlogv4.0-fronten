import { IndexRouteObject } from "react-router-dom";

export interface RouteTypes extends Omit<IndexRouteObject, "index"> {
  id: string;
  path: string;
  parentId?: string;
  noFrame?: boolean;
}
