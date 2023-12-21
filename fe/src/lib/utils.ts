import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

import {
  AdditionalInput,
  DefaultFieldDataConfig,
  FormDetails,
  FormPages,
  OptionalField,
} from "@/models";

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

const getSingleFieldZodObject = (
  field: DefaultFieldDataConfig<"SINGLE_LINE">,
  index: number
) => {
  console.log(field);
  const object: Record<string, z.ZodTypeAny> = {};
  const key = createNameForTheField(field, index);
  object[key] = z
    .string()
    .min(field.config.minCharacterLimit, {
      message: `At least ${field.config.minCharacterLimit} are required.`,
    })
    .max(field.config.maxCharacterLimit, {
      message: `At max ${field.config.minCharacterLimit} are allowed.`,
    });
  return object;
};

const getNameInputZodObject = (
  _field: DefaultFieldDataConfig<"NAME">,
  input: AdditionalInput
) => {
  const object: Record<string, z.ZodTypeAny> = {};
  object[input.inputName] = z.string();
  // if (!_field.config.isRequired) {
  //   object[input.inputName].optional();
  // }
  return object;
};

export const createReadyFromSchema = (form: FormDetails): z.ZodRawShape => {
  const allFields = getAllFields(form.pages);
  let schemaObject = {};
  allFields.forEach((field, index) => {
    if (field.type === "SINGLE_LINE") {
      const _field = field as unknown as DefaultFieldDataConfig<"SINGLE_LINE">;
      const object = getSingleFieldZodObject(_field, index);
      schemaObject = {
        ...schemaObject,
        ...object,
      };
    }
    if (field.type === "NAME") {
      const _field = field as unknown as DefaultFieldDataConfig<"NAME">;
      _field.config.inputs.forEach((input) => {
        const object = getNameInputZodObject(_field, input);
        schemaObject = {
          ...schemaObject,
          ...object,
        };
      });
    }
  });
  return schemaObject;
};
