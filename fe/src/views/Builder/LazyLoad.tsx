import { lazy } from "react";

const LazyLoadBuilder = lazy(() => import("./index"));

export default LazyLoadBuilder;
