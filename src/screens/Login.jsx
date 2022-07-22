import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, setErrorMsgNull } from "../redux/features/AuthSlice";

const Login = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { isLoading, errorMessage, isLoggedIn, successMessage } = useSelector(
    (store) => store.user
  );

    useEffect(() => {
      if (isLoggedIn) {
        window.location.reload()
      }
    }, [isLoggedIn])

  const dispatch = useDispatch();

  const handleSetForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const HandleLoginForm = (e) => {
    e.preventDefault();
    dispatch(LoginUser(form));
  };

  const handleRemoveError = () => {
    dispatch(setErrorMsgNull());
  };

  return (
    <div className="min-h-full relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {successMessage && (
        <div className="absolute px-3 rounded-md text-sm top-[1rem] -right-[3rem] bg-slate-800 text-white w-[19rem] py-3">
          {successMessage}
        </div>
      )}

      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </Link>
            {/* <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a> */}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={HandleLoginForm}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              {errorMessage && (
                <div className="bg-red-500 flex  justify-between text-white text-sm px-4 py-2 rounded-md mb-3">
                  <p>{errorMessage}</p>
                  <span
                    onClick={handleRemoveError}
                    className="font-bold cursor-pointer"
                  >
                    &times;
                  </span>
                </div>
              )}

              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={handleSetForm}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleSetForm}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
              </span>
              {isLoading ? "Please wait..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
