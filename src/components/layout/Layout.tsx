import { ReactNode } from "react";

import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-dvh w-dvw justify-center bg-gray-100">
      <div className="flex h-full w-full md:max-w-[430px] flex-col bg-white">
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <Outlet />
        </main>
        {children}
      </div>
    </div>
  );
};

export default Layout;
