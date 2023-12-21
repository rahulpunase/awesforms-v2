import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

import { APP_NAMES } from "./constants";

const Public = () => {
  // const location = useLocation();
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return (
      <Navigate
        to={APP_NAMES.Dashboard}
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }
  if (!isSignedIn) {
    return <Outlet />;
  }
};

export default Public;
