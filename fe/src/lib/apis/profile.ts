import { UserProfileResponse } from "@/models";

import httpClient from "./httpClient";

export type GetProfilePayload = {
  name: string;
  imageUrl: string;
  email: string;
};

export type CreateOrganizationPayload = {
  orgName: string;
};
export const getProfileOfSignInUser = async (data: GetProfilePayload) => {
  return await httpClient.post<UserProfileResponse>("/profile/me", data);
};

export const createOrganization = async (data: CreateOrganizationPayload) => {
  return await httpClient.post<UserProfileResponse>(
    "/profile/update-org",
    data
  );
};
