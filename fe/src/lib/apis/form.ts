import qs from "query-string";

import { FormDetails } from "@/models";

import httpClient from "./httpClient";

export const getPublicForm = async (formId: string) => {
  const url = qs.stringifyUrl({
    url: "/form/get-form",
    query: {
      formId,
    },
  });
  return await httpClient.get<{
    formDetails: FormDetails;
  }>(url);
};
