import AddFormCard from "./components/AddFormCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FormInput } from "lucide-react";

import FormDropDown from "./components/FormDropDown";
import useFetchAllForms from "./hooks/useFetchAllForms";
import { APP_PATHS } from "@/lib/configs/router-config/constants";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import PageSpecificBar from "@/components/layout/PageSpecificBar";
import { Skeleton } from "@/components/ui/skeleton";

const PageNavLinks = {
  [APP_PATHS.Dashboard]: [
    {
      nameDisplayName: "My Forms",
      path: APP_PATHS.Dashboard,
    },
    {
      nameDisplayName: "Shared Forms",
      path: APP_PATHS.SharedForm,
    },
  ],
};

const Dashboard = () => {
  const { formDetails, isLoading } = useSelector(
    (store: RootState) => store.builder
  );

  useFetchAllForms();

  return (
    <section className="flex flex-row">
      <div className="w-[320px] h-full flex-shrink-0">
        <PageSpecificBar className="">
          <nav className="flex w-full flex-col">
            {PageNavLinks[location.pathname]?.map((navLinks) => (
              <NavLink key={navLinks.path} to={navLinks.path}>
                <div
                  className={cn(
                    "mb-2 p-4 hover:bg-zinc-700 hover:text-zinc-200 rounded-sm",
                    location.pathname === navLinks.path &&
                      "bg-zinc-700 text-zinc-200"
                  )}
                >
                  {navLinks.nameDisplayName}
                </div>
              </NavLink>
            ))}
          </nav>
        </PageSpecificBar>
      </div>
      <div className="flex flex-wrap gap-y-6 p-8">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-sm w-[180px] h-[210px] bg-zinc-100 hover:border-zinc-700 mr-4"
            >
              <Skeleton className="w-[100px] h-[20px] rounded-full bg-zinc-300" />
            </div>
          ))}
        {formDetails.map((formDetail) => (
          <FormDropDown key={formDetail.id} formDetail={formDetail}>
            <div className="flex items-center justify-center rounded-sm w-[180px] h-[210px] bg-zinc-100 transition-all border-2 border-spacing-4  cursor-pointer hover:border-zinc-700 hover:shadow-md mr-4">
              <div className="flex flex-col items-center">
                <FormInput className="w-8 h-8" />
                <div className="px-2 text-center">{formDetail.displayName}</div>
              </div>
            </div>
          </FormDropDown>
        ))}
        <AddFormCard />
      </div>
    </section>
  );
};

export default Dashboard;
