import { noFrames } from "@/router";
import { FC, ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";

export interface LayoutProp {
  children: ReactNode;
}

export const Layout: FC<LayoutProp> = ({ children }) => {
  const { pathname } = useLocation();
  const pageWithoutFrame = useMemo(
    () => noFrames.includes(pathname),
    [pathname]
  );
  console.log(pageWithoutFrame);
  return <>{pageWithoutFrame ? children : <div>{children}</div>}</>;
};
