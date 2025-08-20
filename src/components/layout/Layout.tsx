import { ReactNode } from "react";

import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-dvh w-dvw justify-center bg-gray-100">
      <div className="flex h-full w-full max-w-[430px] flex-col bg-white sm:h-[852px]">
        <main className="h-full w-full">
          <Outlet />
        </main>
        {children}
      </div>
    </div>
  );
};

export default Layout;
