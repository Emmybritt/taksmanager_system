import axiosClient from "../../utils/AxiosClient";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const LoginUser = createAsyncThunk(
  "user/login",
  async (actions, thunkAPI) => {
    thunkAPI.dispatch(setErrorMsgNull());
    return axiosClient
      .post("login", actions)
      .then((res) => {
        console.log(res.data.results);
        if (res.data.code === 400) {
          thunkAPI.dispatch(setErrorMsg(res.data.results[0].msg));
        } else if (res.data.code === 401) {
          thunkAPI.dispatch(setErrorMsg(res.data.message));
        } else if (res.data.code === 404) {
          thunkAPI.dispatch(setErrorMsg(res.data.message));
        } else if (res.data.code === 200) {
          console.log(res.data);
          const token = res.data.results.token;
          const company_id = res.data.results.company_id;
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("companyId", JSON.stringify(company_id));
          thunkAPI.dispatch(setUserData(res.data.results));
          thunkAPI.dispatch(setSuccessMessage(res.data.message))
          setTimeout(() => {
            thunkAPI.dispatch(isAuthenticatedTrue());
          }, 2000);
        }
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data.results[0].msg);
      });
  }
);

const initialState = {
  isLoading: false,
  user: {},
  errorMessage: null,
  successMessage: null,
  isLoggedIn: false,
};
const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUserData: (state, actions) => {
      state.user = actions.payload;
    },
    setErrorMsg: (state, actions) => {
      state.errorMessage = actions.payload;
    },
    setErrorMsgNull: (state) => {
      state.errorMessage = null;
    },
    setSuccessMessage: (state, actions) => {
      state.successMessage = actions.payload;
    },
    isAuthenticatedTrue: (state, actions) => {
      state.isLoggedIn = true;
    },
  },
  extraReducers: {
    [LoginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [LoginUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [LoginUser.fulfilled]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  setUserData,
  setSuccessMessage,
  isAuthenticatedTrue,
  setErrorMsg,
  setErrorMsgNull,
} = AuthSlice.actions;
export default AuthSlice.reducer;
