import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/AxiosClient";

const initialState = {
  loading: false,
  tasks: null,
};

export const FetchTasks = createAsyncThunk(
  "fetchUsers",
  async (actions, thunkAPI) => {
    // console.log(thunkAPI);
    let companyId = localStorage.getItem("companyId");
    return axiosClient
      .get(`team?product=outreach&company_id=${JSON.parse(companyId)}`)
      .then((response) => {
        console.log(response.data);
      });
  }
);

export const CreateTask = createAsyncThunk(
  "createTask",
  async (actions, thunkAPI) => {
    let companyId = localStorage.getItem("companyId");
    const token = localStorage.getItem("token");
    console.log("this is token from TaskSlice/CreateTask", token);
    return axiosClient
      .post(
        `task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`,
        actions,
        {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  }
);


export const getAllTasks = createAsyncThunk("allTasks", async(actions, thunkAPI) => {
  let company_id = localStorage.getItem("companyId");
  let url = `ask/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${JSON.parse(
    company_id
  )}`;

  let token = localStorage.getItem("token");
  
  return axiosClient
    .get(url, {
      Authorization: `Bearer ${JSON.parse(token)}`,
    })
    .then((res) => {
      console.log(res.data);
    });
})

const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = true;
    },
  },
  extraReducers: {
    [CreateTask.rejected]: (state) => {
      state.loading = false;
    },
    [CreateTask.pending]: (state) => {
      state.loading = true;
    },
    [CreateTask.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export const { setLoading } = TaskSlice.actions;
export default TaskSlice.reducer;
