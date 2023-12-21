import { UserButton } from "@clerk/clerk-react";
import { BookCheck, FileText, Home } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { APP_PATHS } from "@/lib/configs/router-config/constants";
import { cn } from "@/lib/utils";

import Logo from "./Logo";

const SideNavigationItems = [
  {
    path: APP_PATHS.Dashboard,
    displayName: "Dashboard",
    icon: <Home className="text-inherit" />,
  },
  {
    path: "/reports",
    displayName: "Reports",
    icon: <FileText className="text-inherit" />,
  },
  {
    path: "/tasks",
    displayName: "Tasks",
    icon: <BookCheck className="text-inherit" />,
  },
];

const SideNavbar = () => {
  const location = useLocation();
  return (
    <div className="w-[92px] flex flex-col h-full bg-zinc-50 items-center flex-shrink-0 fixed z-10">
      <div className="pt-6 w-full h-[82px]">
        <Logo size="m" />
      </div>
      <div className="flex flex-grow flex-col border-r border-zinc-300 w-full">
        <nav className="flex flex-col items-center pt-40 w-full">
          {SideNavigationItems.map((navigationItem) => (
            <NavLink
              key={navigationItem.path}
              className="w-full"
              to={navigationItem.path}
            >
              <div
                className={cn(
                  "flex flex-col justify-center items-center p-2 group hover:bg-zinc-700 hover:text-zinc-200 rounded-sm mb-4",
                  navigationItem.path === location.pathname &&
                    "bg-zinc-700 text-zinc-200"
                )}
              >
                <div>{navigationItem.icon}</div>
                <div className="text-xs pt-2">{navigationItem.displayName}</div>
              </div>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto w-full flex justify-center pb-6">
          <UserButton
            afterSignOutUrl={APP_PATHS.SignIn}
            appearance={{
              elements: {
                avatarBox: "h-[48px] w-[48px] rounded-h-16",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
