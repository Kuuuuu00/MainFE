import { Outlet } from "react-router-dom";

const LayoutWithoutNavbar = () => {
  return (
    <div className="flex h-dvh w-dvw justify-center bg-gray-100">
      <div className="flex h-full w-full md:max-w-[430px] flex-col bg-white md:h-[852px]">
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutWithoutNavbar;
