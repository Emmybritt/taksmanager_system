const { Outlet } = require("react-router-dom")

const AuthLayouts = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  )
}

export default AuthLayouts;