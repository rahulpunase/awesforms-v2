import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";

import { initialState } from "./builder.slice";

const builderState = (store: RootState) => store.builder ?? initialState;

export const selectSelectedForm = createSelector(
  builderState,
  (state) => state.selectedForm
);

export const selectSelectedTempId = createSelector(
  builderState,
  (state) => state.selectedTempId
);

export const selectIsBuilderLoading = createSelector(
  builderState,
  (state) => state.isLoading
);

export const selectIsFormUpdateSaving = createSelector(
  builderState,
  (state) => state.isFormUpdateSaving
);

export const selectSelectedTempIdToDelete = createSelector(
  builderState,
  (state) => state.selectedTempIdToDelete
);
