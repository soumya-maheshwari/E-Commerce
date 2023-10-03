import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const addToCartThunk = createAsyncThunk("cart/add", async (data) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user.accessToken);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    },
  };

  return await Api.post(`cart/add`, data, config)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const removeFromCart = createAsyncThunk("cart/remove", async () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user.accessToken);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    },
  };

  return await Api.get(`cart/remove`, config)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const getAllProducts = createAsyncThunk("cart/all", async () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user.accessToken);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    },
  };

  return await Api.get(`cart/all`, config)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addToCartThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(addToCartThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default cartSlice.reducer;
