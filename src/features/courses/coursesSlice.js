import { createSlice } from "@reduxjs/toolkit";
import { uuid } from "uuidv4";

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
        return { payload: { name, id: uuid() } };
      },
    },
  },
});

export const { addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
