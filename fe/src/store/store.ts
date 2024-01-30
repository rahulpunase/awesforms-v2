import {
  combineReducers,
  configureStore as configureToolKitStore,
  Reducer,
} from "@reduxjs/toolkit";
import React from "react";

import { BuilderSliceInitialState } from "@/models";

import profileSliceReducer from "./slice/profile/profile.slice";

export function createReducer(asyncReducers?: Reducer) {
  return combineReducers({
    profile: profileSliceReducer,
    ...asyncReducers,
  });
}

// Configure the store
export function configureStore() {
  const store = configureToolKitStore({
    reducer: createReducer(),
  });

  store.asyncReducers = {};
  // Add a dictionary to keep track of the registered async reducers

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key: string, asyncReducer: Reducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  // Return the modified store
  return store;
}

const store = configureStore();

export const useInjector = ({
  key,
  reducer,
}: {
  key: string;
  reducer: Reducer;
}) => {
  React.useEffect(() => {
    store.injectReducer(key, reducer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default store;

export type RootState = ReturnType<typeof store.getState> & {
  builder: BuilderSliceInitialState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
