import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const coursesSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {
    addCourse: {
      reducer(state, action) {
        const {
          id,
          name,
          assessments,
          desiredGrade,
          createdAt,
        } = action.payload;
        state.push({ id, name, assessments, desiredGrade, createdAt });
      },
      prepare({ name, assessments, desiredGrade }) {
        return {
          payload: {
            name,
            assessments,
            desiredGrade,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const { addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
