import { Outlet } from "react-router-dom";
import SideBarComponent from "../components/SideBarComponent";


const Header = () => {
  return (
    <div className="bg-white h-[4rem] shadow-md"></div>
  )
}

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="md:w-[22%] w-0 h-screen bg-slate-700">
        <SideBarComponent />
      </div>
      <div className="w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
