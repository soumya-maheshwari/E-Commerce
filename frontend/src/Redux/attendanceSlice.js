import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const logAttendanceThunk = createAsyncThunk(
  "attendance/log",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post(`attendance/log`, data, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const getAllAttendanceThunk = createAsyncThunk(
  "attendance/get",
  async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.get(`attendance/getAttendance`, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(logAttendanceThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logAttendanceThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(logAttendanceThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      .addCase(getAllAttendanceThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAttendanceThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(getAllAttendanceThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default attendanceSlice.reducer;
