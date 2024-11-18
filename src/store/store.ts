import { configureStore } from "@reduxjs/toolkit";
import rickAndMortyReducer from "./slices/brandSlice";

const store = configureStore({
  reducer: {
    transactions: rickAndMortyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
