import { useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AuthNavigation from "./AuthNavigation";
import DashboardNavigation from "./DashboardNavigation";

const WebNaviagtion = () => {
  const toke = localStorage.getItem('token');
  const token = JSON.parse(toke);

  return (
    <BrowserRouter>
    {token ? <DashboardNavigation /> : <AuthNavigation />}
    </BrowserRouter>
  );
};

export default WebNaviagtion;
