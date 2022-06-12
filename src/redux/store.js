import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  // createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/reducer";
import questionReducer from "./question/reducer";
import answerReducer from "./answer/reducer";
import userReducer from "./user/reducer";

const reducer = combineReducers({
  authentication: authReducer,
  question: questionReducer,
  answer: answerReducer,
  user: userReducer,
});

// const dataTransform = createTransform(
//   (inboundState) => new TextEncoder("utf-8").encode(inboundState),
//   (outboundState) => new TextEncoder().decode(outboundState),
// );

const persistConfig = {
  key: "root",
  storage,
  // transforms: [dataTransform],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
