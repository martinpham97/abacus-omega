import { combineReducers } from "@reduxjs/toolkit";

import coursesReducer from "features/courses/coursesSlice";

const rootReducer = combineReducers({
  courses: coursesReducer,
});

export default rootReducer;
