import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authReducer from "./authSlice";
import attendanceReducer from "./attendanceSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

// Redux Persist configuration
const persistConfig = {
  key: "root", // The key for the root of the state object
  storage: storage, // The storage engine (localStorage in this case)
  // Add any other configuration options if needed
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedAttendanceReducer = persistReducer(
  persistConfig,
  attendanceReducer
);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedProductReducer = persistReducer(persistConfig, productReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    attendance: persistedAttendanceReducer,
    cart: persistedCartReducer,
    product: persistedProductReducer,
  },

  middleware: [thunk],
});

// Create the persisted store
const persistor = persistStore(store);

export { persistor, store };
