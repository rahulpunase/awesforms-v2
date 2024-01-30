import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getSingleForm,
  updateForm,
  UpdateFormPayload,
} from "@/lib/apis/builder";
import { CreateFormResponse } from "@/models";

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
