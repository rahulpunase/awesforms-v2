import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormDetails } from "@/models";

import ActualFormField from "./ActualFormField";
const ActualForm = ({ formDetails }: { formDetails: FormDetails }) => {
  const fields = formDetails?.pages[0].fields;

  const form = useForm();

  const onSubmit = (values: unknown) => {
    console.log("val", values);
  };

  if (!formDetails) {
    return <div>No Form Provided</div>;
  }
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
