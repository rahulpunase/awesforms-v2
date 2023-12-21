import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNameForTheField } from "@/lib/utils";
import { DefaultFieldDataConfig, OptionalField } from "@/models";

import {
  getMaxLengthObject,
  getMinLengthObject,
  getRequiredObject,
} from "./utils";

const ActualFormField = ({
  field,
  index,
  register,
  errors,
}: {
  field: OptionalField;
  index: number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  if (field.type === "SINGLE_LINE") {
    const _field = field as DefaultFieldDataConfig<"SINGLE_LINE">;
    const fieldName = createNameForTheField(_field, index);
    return (
      <FormField
        name={fieldName}
        render={() => (
          <FormItem>
            <FormLabel>{_field.config.label}</FormLabel>
            <Input
              defaultValue={_field.config.initialValue}
              {...register(fieldName, {
                required: getRequiredObject(_field.config.isRequired),
                minLength: getMinLengthObject(_field.config.minCharacterLimit),
                maxLength: getMaxLengthObject(_field.config.maxCharacterLimit),
              })}
            />
            {_field.config.instruction && (
              <FormDescription>{_field.config.instruction}</FormDescription>
            )}
            {errors[_field.inputName] && (
              <FormMessage className="text-rose-500">
                {errors[_field.inputName]?.message?.toString()}
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    );
  }
  if (field.type === "MULTI_LINE") {
    const _field = field as DefaultFieldDataConfig<"MULTI_LINE">;
    const fieldName = createNameForTheField(_field, index);
    return (
      <FormField
        name={fieldName}
        render={() => (
          <FormItem>
            <FormLabel>{_field.config.label}</FormLabel>
            <Textarea
              defaultValue={_field.config.initialValue}
              {...register(fieldName, {
                required: getRequiredObject(_field.config.isRequired),
                minLength: getMinLengthObject(_field.config.minCharacterLimit),
                maxLength: getMaxLengthObject(_field.config.maxCharacterLimit),
              })}
            />
            {_field.config.instruction && (
              <FormDescription>{_field.config.instruction}</FormDescription>
            )}
            {errors[_field.inputName] && (
              <FormMessage className="text-rose-500">
                {errors[_field.inputName]?.message?.toString()}
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    );
  }
  if (field.type === "ADDRESS") {
    const _field = field as DefaultFieldDataConfig<"ADDRESS">;
  }
  return <div>Field not created</div>;
};

export default ActualFormField;
