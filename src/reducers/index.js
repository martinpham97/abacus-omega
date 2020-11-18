import { combineReducers } from "@reduxjs/toolkit";

import appReducer from "features/app/appSlice";
import coursesReducer from "features/courses/coursesSlice";

const rootReducer = combineReducers({
  app: appReducer,
  courses: coursesReducer,
});

export default rootReducer;
