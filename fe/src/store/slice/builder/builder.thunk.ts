import {
  CreateFormDetailsPayload,
  UpdateFormPayload,
  createFormDetails,
  getForms,
  getSingleForm,
  updateForm,
} from "@/lib/apis/builder";
import { CreateFormResponse, FormDetails, FormPages } from "@/models";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createForm = createAsyncThunk(
  "createForm",
  async (values: CreateFormDetailsPayload) => {
    return await createFormDetails(values);
  }
);

export const fetchAllForms = createAsyncThunk(
  "fetchAllForms",
  async (organizationId: string) => {
    return await getForms(organizationId);
  }
);

export const fetchFormFromFormId = createAsyncThunk(
  "fetchFormFromFormId",
  async ({
    organizationId,
    formId,
  }: {
    organizationId: string;
    formId: string;
  }) => {
    return await getSingleForm(organizationId, formId);
  }
);

export const updateFormDetails = createAsyncThunk(
  "updateFormDetails",
  async (data: UpdateFormPayload): Promise<CreateFormResponse> => {
    return await updateForm(data);
  }
);
