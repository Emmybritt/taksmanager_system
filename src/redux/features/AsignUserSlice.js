import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/AxiosClient";

const initialState = {
  loading: false,
  users: null,
};


export const FetchUsers = createAsyncThunk("fetchUsers", async (actions, thunkAPI) => {
  let companyId = localStorage.getItem("companyId");
  console.log('it is working');
  return axiosClient.get(`team?product=outreach&company_id=${JSON.parse(companyId)}`).then((response) => {
    // console.log(response.data.results.data);
    if (response.data.code === 200) {
      thunkAPI.dispatch(setUsersData(response.data.results.data));
    }
  })
});


const AsignUserSlice = createSlice({
  name: "AsignUser",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = true;
    },
    setUsersData: (state, {payload}) => {
      state.users = payload;
    }
  },
  extraReducers: {

  }
});

export const {setLoading, setUsersData} = AsignUserSlice.actions;
export default AsignUserSlice.reducer;
