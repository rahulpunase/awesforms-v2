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
            {errors[fieldName] && (
              <FormMessage className="text-rose-500">
                {errors[fieldName]?.message?.toString()}
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
            {errors[fieldName] && (
              <FormMessage className="text-rose-500">
                {errors[fieldName]?.message?.toString()}
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    );
  }
  if (field.type === "ADDRESS") {
    const _field = field as DefaultFieldDataConfig<"ADDRESS">;
    const street1 = _field.config.inputs.street1.name + "_" + index;
    const street2 = _field.config.inputs.street2.name + "_" + index;
    const city = _field.config.inputs.city.name + "_" + index;
    const country = _field.config.inputs.country.name + "_" + index;
    const postal = _field.config.inputs.postal.name + "_" + index;
    const state = _field.config.inputs.state.name + "_" + index;
    return (
      <>
        <FormLabel>Address</FormLabel>
        <div className="mt-2">
          <FormField
            name={street1}
            render={() => (
              <FormItem>
                <Input
                  {...register(street1, {
                    required: getRequiredObject(
                      _field.config.inputs.street1.isRequired
                    ),
                  })}
                />
                <FormLabel className="text-zinc-500 text-xs pt-2">
                  {_field.config.inputs.street1.label}
                </FormLabel>
                {errors[street1] && (
                  <FormMessage className="text-rose-500">
                    {errors[street1]?.message?.toString()}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name={street2}
            render={() => (
              <FormItem>
                <Input
                  {...register(street2, {
                    required: getRequiredObject(
                      _field.config.inputs.street2.isRequired
                    ),
                  })}
                />
                {_field.config.instruction && (
                  <FormDescription>
                    {_field.config.inputs.street2.label}
                  </FormDescription>
                )}
                {errors[street2] && (
                  <FormMessage className="text-rose-500">
                    {errors[street2]?.message?.toString()}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <FormField
            name={city}
            render={() => (
              <FormItem>
                <Input
                  {...register(city, {
                    required: getRequiredObject(
                      _field.config.inputs.city.isRequired
                    ),
                  })}
                />
                {_field.config.instruction && (
                  <FormDescription>
                    {_field.config.inputs.city.label}
                  </FormDescription>
                )}
                {errors[city] && (
                  <FormMessage className="text-rose-500">
                    {errors[city]?.message?.toString()}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name={state}
            render={() => (
              <FormItem>
                <Input
                  {...register(state, {
                    required: getRequiredObject(
                      _field.config.inputs.state.isRequired
                    ),
                  })}
                />
                {_field.config.instruction && (
                  <FormDescription>
                    {_field.config.inputs.state.label}
                  </FormDescription>
                )}
                {errors[state] && (
                  <FormMessage className="text-rose-500">
                    {errors[state]?.message?.toString()}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <FormField
            name={postal}
            render={() => (
              <FormItem>
                <Input
                  {...register(postal, {
                    required: getRequiredObject(
                      _field.config.inputs.postal.isRequired
                    ),
                  })}
                />
                {_field.config.inputs.postal.label && (
                  <FormDescription>
                    {_field.config.inputs.postal.label}
                  </FormDescription>
                )}
                {errors[postal] && (
                  <FormMessage className="text-rose-500">
                    {errors[postal]?.message?.toString()}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name={country}
            render={() => (
              <FormItem>
                <Input
                  {...register(country, {
                    required: getRequiredObject(
                      _field.config.inputs.country.isRequired
                    ),
                  })}
                />
                {_field.config.instruction && (
                  <FormDescription>
                    {_field.config.inputs.country.label}
                  </FormDescription>
                )}
                {errors[country] && (
                  <FormMessage className="text-rose-500">
                    {errors[country]?.message?.toString()}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
      </>
    );
  }
  if (field.type === "NUMBER") {
    const _field = field as DefaultFieldDataConfig<"NUMBER">;
    const fieldName = createNameForTheField(_field, index);
    return (
      <FormField
        name={fieldName}
        render={() => (
          <FormItem>
            <FormLabel>{_field.config.label}</FormLabel>
            <Input
              type="number"
              {...register(fieldName, {
                required: getRequiredObject(_field.config.isRequired),
                minLength: getMinLengthObject(_field.config.minCharacterLimit),
                maxLength: getMaxLengthObject(_field.config.maxCharacterLimit),
              })}
            />
            {_field.config.instruction && (
              <FormDescription>{_field.config.instruction}</FormDescription>
            )}
            {errors[fieldName] && (
              <FormMessage className="text-rose-500">
                {errors[fieldName]?.message?.toString()}
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    );
  }
  return <div>Field not created</div>;
};

export default ActualFormField;
