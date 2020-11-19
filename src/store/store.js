import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // Ignore some redux-persist actions to avoid strict-mode errors
  // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("reducers", () => {
    const newRootReducer = require("reducers").default;
    store.replaceReducer(newRootReducer);
  });
}

export { store, persistor };
