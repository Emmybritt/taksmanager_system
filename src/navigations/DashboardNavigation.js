import { Route, Routes } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayouts";
import DashBoard from "../screens/Dashboard/Index"
import NotFound from "../screens/NotFound";

const DashboardNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="" element={<DashBoard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      </Routes>
  ) 
}

export default DashboardNavigation;