import AuthSlice from "../features/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import AsignUserSlice from "../features/AsignUserSlice";
import TaskSlice from "../features/TaskSlice";


export default configureStore({
  reducer: {
    user: AuthSlice,
    users: AsignUserSlice,
    tasks: TaskSlice
  },
});
