import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import ModalProvider from "@/lib/providers/ModalProvider";

import Header from "./Header";
import SideNavbar from "./SideNavbar";

const MainLayout: React.FC<PropsWithChildren> = () => {
  return (
    <ModalProvider>
      <div className="flex  h-full font-poppins w-full">
        <SideNavbar />
        <main className="flex flex-col flex-grow ml-[92px]">
          <div className="h-[82px] flex-shrink-0 fixed left-0 w-full z-10">
            <Header />
          </div>
          <div className="flex flex-row flex-grow mt-[82px]">
            <div className="flex flex-grow">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </ModalProvider>
  );
};

export default MainLayout;
