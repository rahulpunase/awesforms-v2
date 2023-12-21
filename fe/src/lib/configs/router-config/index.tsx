import { useAuth } from "@clerk/clerk-react";
import { PropsWithChildren, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";
import LazyAboutYourSelf from "@/views/AboutYourSelf/LazyLoad";
import LazyLoadBuilder from "@/views/Builder/LazyLoad";
import LazyDashboardView from "@/views/Dashboard/LazyLoad";
import SignIn from "@/views/SignIn";

import { APP_NAMES } from "./constants";
import Public from "./Public";
import RequireAuth from "./RequireAuth";

export const PublicPageWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { userId } = useAuth();
  if (userId) {
    return <Navigate to={APP_NAMES.Dashboard} />;
  }
  return children;
};

export const RouterConfigWrapper: React.FC = (): ReactElement => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<AppLayout />}>
        <Route element={<Public />}>
          <Route
            path="/"
            element={<Navigate to={APP_NAMES.SignIn} replace />}
          />
          <Route path={APP_NAMES.SignIn} element={<SignIn />} />
          <Route path={APP_NAMES.SignUp} element={<div>Sign Up</div>} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<RequireAuth />}>
          <Route path={APP_NAMES.Dashboard} element={<LazyDashboardView />} />
          <Route
            path={APP_NAMES.AboutYourSelf}
            element={<LazyAboutYourSelf />}
          />
          <Route path={APP_NAMES.Builder}>
            <Route path=":formId" element={<LazyLoadBuilder />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
