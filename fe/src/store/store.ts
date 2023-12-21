import { configureStore } from "@reduxjs/toolkit";

import builder from "./slice/builder/builder.slice";
import profile from "./slice/profile/profile.slice";

export const store = configureStore({
  reducer: {
    profile,
    builder,
  },
});

store.replaceReducer;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
