import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";

import { initialState } from "./profile.slice";

const profileState = (store: RootState) => store.profile ?? initialState;

export const selectUserProfile = createSelector(
  profileState,
  (state) => state.profile
);

export const selectUserForms = createSelector(
  profileState,
  (state) => state.forms
);

export const selectIsFormLoading = createSelector(
  profileState,
  (state) => state.isLoading
);
