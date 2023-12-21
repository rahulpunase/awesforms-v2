import {
  CreateFormResponse,
  FormDetails,
  FormDetailsResponse,
  FormPages,
} from "@/models";
import httpClient from "./httpClient";
import qs from "query-string";

export type CreateFormDetailsPayload = {
  name: string;
  type: string;
};

export type UpdateFormPayload = {
  formId: string;
  pages: FormPages[];
};

export const createFormDetails = async (data: CreateFormDetailsPayload) => {
  return await httpClient.post<CreateFormResponse>("/form/create", data);
};

export const getForms = async (organizationId: string) => {
  const url = qs.stringifyUrl({
    url: "/form/all",
    query: {
      organizationId,
    },
  });
  return await httpClient.get<FormDetailsResponse>(url);
};

export const getSingleForm = async (organizationId: string, formId: string) => {
  const url = qs.stringifyUrl({
    url: "/form/get",
    query: {
      organizationId,
      formId,
    },
  });
  return await httpClient.get<CreateFormResponse>(url);
};

export const updateForm = async (data: UpdateFormPayload) => {
  return await httpClient.post<CreateFormResponse>("/form/update", data);
};
