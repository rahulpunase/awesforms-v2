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

import {
  createForm,
  fetchAllForms,
  fetchFormFromFormId,
  updateFormDetails,
} from "./builder.thunk";

const initialState: BuilderSliceInitialState = {
  isLoading: true,
  formDetails: [],
  selectedForm: null,
  selectedTempId: "",
  isFormUpdateSaving: false,
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

    addFieldToSelectedForm: (state, action: PayloadAction<OptionalField>) => {
      if (!state.selectedForm) return;
      const field = JSON.parse(JSON.stringify(action.payload)) as OptionalField;
      field.tempId = uuidv4();
      const selectedPage = state.selectedForm.pages.find(
        (page) => page.isSelected
      );
      if (!selectedPage) {
        return;
      }
      selectedPage.fields.push(field);
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

    deleteField: (
      state: BuilderSliceInitialState,
      action: PayloadAction<{
        tempId: string;
      }>
    ) => {
      const selectedPage = state.selectedForm?.pages.find(
        (page) => page.isSelected
      );
      if (!selectedPage) {
        return;
      }
      const indexToDelete = selectedPage.fields.findIndex(
        (field) => field.tempId === action.payload.tempId
      );

      selectedPage.fields.splice(indexToDelete, 1);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllForms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllForms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.formDetails = action.payload.formDetails;
    });

    builder.addCase(createForm.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createForm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.formDetails = [...state.formDetails, action.payload.form];
    });

    builder.addCase(fetchFormFromFormId.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchFormFromFormId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedForm = action.payload.form;
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

export default BuilderSlice.reducer;

export const {
  addPageToSelectedForm,
  addFieldToSelectedForm,
  setSelectedTempId,
  updateSingleLineConfig,
  updateAddressInputElements,
  updateAddressConfig,
  deleteField,
} = BuilderSlice.actions;
