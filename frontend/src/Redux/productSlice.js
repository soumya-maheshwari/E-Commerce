import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const searchProductThunk = createAsyncThunk(
  "product/search",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    return await Api.get(`product/search?query=${data}`, config)
      .then((res) => {
        console.log(data);
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(searchProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(searchProductThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default productSlice.reducer;
