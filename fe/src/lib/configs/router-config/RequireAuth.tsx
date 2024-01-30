import { LoaderIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";
import { RootState } from "@/store/store";

import { APP_NAMES } from "./constants";

const RequireAuth = () => {
  const { profile, isProfileFetching } = useSelector(
    (store: RootState) => store.profile
  );

  if (isProfileFetching) {
    return (
      <div className="flex flex-row items-center justify-center h-full w-full ">
        <LoaderIcon className="transition animate-spin  rotate-2" />
      </div>
    );
  }

  if (!profile) {
    return <Navigate to={APP_NAMES.SignIn} replace />;
  }

  if (profile) {
    return <MainLayout />;
  }
};

export default RequireAuth;
