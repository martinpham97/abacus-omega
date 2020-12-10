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
    editCourse(state, action) {
      const { id, ...update } = action.payload;
      const courseIndex = state.findIndex((c) => c.id === id);
      if (courseIndex >= 0) {
        return [
          ...state.slice(0, courseIndex),
          {
            ...state[courseIndex],
            ...update,
          },
          ...state.slice(courseIndex + 1),
        ];
      }
      return state;
    },
    deleteCourse(state, action) {
      const { id } = action.payload;
      return state.filter((course) => course.id !== id);
    },
    deleteMultipleCourses(state, action) {
      const { ids } = action.payload;
      return state.filter((course) => !ids.includes(course.id));
    },
  },
});

export const {
  addCourse,
  editCourse,
  deleteCourse,
  deleteMultipleCourses,
} = coursesSlice.actions;

export default coursesSlice.reducer;
