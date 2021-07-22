import { configureStore } from "@reduxjs/toolkit";
import tankReducer from "./slice";

export const store = configureStore({
  reducer: tankReducer
});
