import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import {
  AdditionalAddressInputsKeys,
  BuilderSliceInitialState,
  DefaultFieldDataConfig,
  KnownFieldConfig,
  OptionalField,
  ToUpdateConfig,
} from "@/models";

import { fetchFormFromFormId, updateFormDetails } from "./builder.thunk";

export const initialState: BuilderSliceInitialState = {
  isLoading: true,
  selectedForm: null,
  selectedTempId: "",
  isFormUpdateSaving: false,
  selectedTempIdToDelete: "",
};

const BuilderSlice = createSlice({
  initialState,
  name: "builder",
  reducers: {
    addPageToSelectedForm: (state) => {
      if (!state.selectedForm) return;
      state.selectedForm = {
        ...state.selectedForm,
        pages: [
          {
            isVisible: true,
            isSelected: true,
            fields: [],
            pageNumber: 1,
          },
        ],
      };
    },

    addFieldToSelectedForm: (
      state,
      action: PayloadAction<{
        field: OptionalField;
        indexToAdd: number;
      }>
    ) => {
      if (!state.selectedForm) return;
      const field = JSON.parse(
        JSON.stringify(action.payload.field)
      ) as OptionalField;
      field.tempId = uuidv4();
      const selectedPage = state.selectedForm.pages.find(
        (page) => page.isSelected
      );
      if (!selectedPage) {
        return;
      }
      if (!selectedPage.fields.length) {
        selectedPage.fields.push(field);
        return;
      }
      selectedPage.fields.splice(action.payload.indexToAdd + 1, 0, field);
    },

    setSelectedTempId: (state, action: PayloadAction<string>) => {
      state.selectedTempId = action.payload;
    },

    updateSingleLineConfig: (
      state: BuilderSliceInitialState,
      action: PayloadAction<{
        tempId: string;
        toUpdate: ToUpdateConfig<"SINGLE_LINE">;
      }>
    ) => {
      const selectedPage = state.selectedForm?.pages.find(
        (page) => page.isSelected
      );
      if (!selectedPage) {
        return;
      }
      const selectedField = selectedPage.fields.find(
        (field) => field.tempId === action.payload.tempId
      ) as DefaultFieldDataConfig<"SINGLE_LINE">;

      if (!selectedField) {
        return;
      }

      selectedField.config = {
        ...selectedField.config,
        ...action.payload.toUpdate,
      };
    },

    updateAddressConfig: (
      state: BuilderSliceInitialState,
      action: PayloadAction<{
        tempId: string;
        toUpdate: ToUpdateConfig<"ADDRESS">;
      }>
    ) => {
      const selectedPage = state.selectedForm?.pages.find(
        (page) => page.isSelected
      );
      if (!selectedPage) {
        return;
      }
      const selectedField = selectedPage.fields.find(
        (field) => field.tempId === action.payload.tempId
      ) as DefaultFieldDataConfig<"ADDRESS">;

      if (!selectedField) {
        return;
      }

      selectedField.config = {
        ...selectedField.config,
        ...action.payload.toUpdate,
      };
    },

    updateAddressInputElements: (
      state: BuilderSliceInitialState,
      action: PayloadAction<{
        tempId: string;
        firstLevel: AdditionalAddressInputsKeys;
        property: string;
        value: string | boolean;
      }>
    ) => {
      const selectedPage = state.selectedForm?.pages.find(
        (page) => page.isSelected
      );
      if (!selectedPage) {
        return;
      }
      const selectedField = selectedPage.fields.find(
        (field) => field.tempId === action.payload.tempId
      ) as DefaultFieldDataConfig<"ADDRESS">;

      selectedField.config = {
        ...selectedField.config,
        inputs: {
          ...selectedField.config.inputs,
          [action.payload.firstLevel]: {
            ...selectedField.config.inputs[action.payload.firstLevel],
            [action.payload.property]: action.payload.value,
          },
        },
      } as KnownFieldConfig<"ADDRESS">;
    },

    deleteField: (state: BuilderSliceInitialState) => {
      const selectedPage = state.selectedForm?.pages.find(
        (page) => page.isSelected
      );
      if (!selectedPage) {
        return;
      }
      const indexToDelete = selectedPage.fields.findIndex(
        (field) => field.tempId === state.selectedTempIdToDelete
      );

      selectedPage.fields.splice(indexToDelete, 1);
      state.selectedTempIdToDelete = "";
    },

    setForDelete: (
      state: BuilderSliceInitialState,
      action: PayloadAction<{
        tempId: string;
      }>
    ) => {
      state.selectedTempIdToDelete = action.payload.tempId;
    },

    unSetForDelete: (state: BuilderSliceInitialState) => {
      state.selectedTempIdToDelete = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFormFromFormId.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchFormFromFormId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedForm = action.payload.form;
      if (!action.payload.form?.pages?.length) {
        state.selectedForm = {
          ...state.selectedForm,
          pages: [
            {
              isVisible: true,
              isSelected: true,
              fields: [],
              pageNumber: 1,
            },
          ],
        };
      }
    });

    builder.addCase(updateFormDetails.pending, (state) => {
      state.isFormUpdateSaving = true;
    });

    builder.addCase(updateFormDetails.fulfilled, (state, action) => {
      state.isFormUpdateSaving = false;
      state.selectedForm = action.payload.form;
    });
  },
});

export default BuilderSlice;

export const {
  addPageToSelectedForm,
  addFieldToSelectedForm,
  setSelectedTempId,
  updateSingleLineConfig,
  updateAddressInputElements,
  updateAddressConfig,
  deleteField,
  setForDelete,
  unSetForDelete,
} = BuilderSlice.actions;
