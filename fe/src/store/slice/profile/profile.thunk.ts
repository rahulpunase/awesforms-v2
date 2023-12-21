import {
  CreateOrganizationPayload,
  GetProfilePayload,
  createOrganization,
  getProfileOfSignInUser,
} from "@/lib/apis/profile";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchProfile = createAsyncThunk(
  "fetchProfile",
  async (data: GetProfilePayload) => {
    const response = await getProfileOfSignInUser(data);
    return response;
  }
);

const updateOrganization = createAsyncThunk(
  "updateOrganization",
  async (data: CreateOrganizationPayload) => {
    const response = await createOrganization(data);
    return response;
  }
);

export { fetchProfile, updateOrganization };
