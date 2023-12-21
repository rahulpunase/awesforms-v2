import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RootState } from "@/store/store";

import ActualFormField from "./ActualFormField";
const ActualForm = () => {
  const { selectedForm } = useSelector((store: RootState) => store.builder);
  const fields = selectedForm?.pages[0].fields;

  const form = useForm();

  const onSubmit = (values: unknown) => {
    console.log("val", values);
  };

  console.log("Error", form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields?.map((formField, index) => (
          <div className="pt-6">
            <ActualFormField
              key={formField.tempId}
              register={form.register}
              field={formField}
              index={index}
              errors={form.formState.errors}
            />
          </div>
        ))}
        <div className="mt-4">
          <Button
            disabled={!!Object.keys(form.formState.errors).length}
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ActualForm;
