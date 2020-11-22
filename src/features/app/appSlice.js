/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    themeType: "dark",
  },
  reducers: {
    setThemeType(state, action) {
      const { type } = action.payload;
      state.themeType = type;
    },
  },
});

export const { setThemeType } = appSlice.actions;

export default appSlice.reducer;
