import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const coursesSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {
    addCourse: {
      reducer(state, action) {
        const { id, name } = action.payload;
        state.push({ id, name });
      },
      prepare(name) {
        return { payload: { name, id: uuidv4() } };
      },
    },
  },
});

export const { addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
