import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

import { APP_PATHS } from "@/lib/configs/router-config/constants";

const BuilderHeaderContent = lazy(() => import("./BuilderHeaderContent"));

const HIDE_HEADER_FROM = [APP_PATHS.AboutYourSelf];

const ROUTE_NAME_MAPPING = {
  [APP_PATHS.Dashboard]: "My Forms",
  [APP_PATHS.Builder]: "Builder",
};

const Header = () => {
  const location = useLocation();
  const pathToMatch = `/${location.pathname.split("/")[1] ?? ""}`;

  if (HIDE_HEADER_FROM.includes(pathToMatch)) {
    return null;
  }

  const renderChildrenAsPerRoute = () => {
    if (pathToMatch === APP_PATHS.Builder) {
      return <BuilderHeaderContent />;
    }
  };

  return (
    <header className=" bg-zinc-50 border-b border-zinc-300 h-full w-full">
      <div className="flex w-full h-full px-4">
        <div className="flex items-center text-2xl">
          {ROUTE_NAME_MAPPING[pathToMatch]}
        </div>
        <Suspense>{renderChildrenAsPerRoute()}</Suspense>
      </div>
    </header>
  );
};

export default Header;
