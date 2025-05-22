import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";

export const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="fixed z-9999 w-screen px-5 bg-white shadow-md">
        <Navbar />
      </div>
      <div className="w-full overflow-y-auto mt-[4rem]">
        <Outlet />
      </div>
    </div>
  );
};
