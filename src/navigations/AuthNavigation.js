import { Route, Routes } from "react-router-dom"
import AuthLayouts from "../layouts/AuthLayouts"
import Login from "../screens/Login"
import Register from "../screens/Register"


const AuthNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayouts />}>
        <Route path="" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      </Routes>
  ) 
}

export default AuthNavigation;