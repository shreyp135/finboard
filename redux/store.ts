"use client";
import { configureStore, } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboard_slice";
import { alphaApi } from "@/api/alpha_api";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    [alphaApi.reducerPath]: alphaApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(alphaApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
