"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Widget {
  id: string;
  type: "chart" | "table" | "card";
  title: string;
}

interface DashboardState {
  widgets: Widget[];
}

const initialState: DashboardState = {
  widgets: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets.push(action.payload);
      localStorage.setItem("dashboardState", JSON.stringify(state));
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter((w) => w.id !== action.payload);
      localStorage.setItem("dashboardState", JSON.stringify(state));
    },
  },
});

export const { addWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;
