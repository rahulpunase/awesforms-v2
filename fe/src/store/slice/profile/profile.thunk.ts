import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createFormDetails,
  CreateFormDetailsPayload,
  getForms,
} from "@/lib/apis/builder";
import {
  createOrganization,
  CreateOrganizationPayload,
  getProfileOfSignInUser,
  GetProfilePayload,
} from "@/lib/apis/profile";

const fetchProfile = createAsyncThunk(
  "fetchProfile",
  async (data: GetProfilePayload) => {
    const response = await getProfileOfSignInUser(data);
    return response;
  }
);

export const createForm = createAsyncThunk(
  "createForm",
  async (values: CreateFormDetailsPayload) => {
    return await createFormDetails(values);
  }
);

const updateOrganization = createAsyncThunk(
  "updateOrganization",
  async (data: CreateOrganizationPayload) => {
    const response = await createOrganization(data);
    return response;
  }
);

export const fetchAllForms = createAsyncThunk(
  "fetchAllForms",
  async (organizationId: string) => {
    return await getForms(organizationId);
  }
);

export { fetchProfile, updateOrganization };
