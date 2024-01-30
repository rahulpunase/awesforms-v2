import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { FormPages, OptionalField } from "@/models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getAllFields = (pages: FormPages[]): OptionalField[] => {
  let allFields: OptionalField[] = [];
  pages.forEach((page) => {
    allFields = [...allFields, ...page.fields];
  });
  return allFields;
};

export const createNameForTheField = (field: OptionalField, index: number) =>
  `${field.inputName}_${index}`;
