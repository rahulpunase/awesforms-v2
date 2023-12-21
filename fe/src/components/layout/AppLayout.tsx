import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import useFetchOnLoadProfile from "@/lib/hooks/useFetchOnLoadProfile";

const AppLayout = () => {
  useFetchOnLoadProfile();
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default AppLayout;
