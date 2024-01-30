import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Diamond, FormInputIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/lib/hooks/useModal";
import { createForm } from "@/store/slice/profile/profile.thunk";
import { AppDispatch, RootState } from "@/store/store";

import FormTypeField from "./FormTypeField";

const FormTypeSelection = {
  Standard: "standard",
  Card: "card",
};
const AddFormModal = () => {
  const { onClose } = useModal();
  const { profile } = useSelector((store: RootState) => store.profile);
  const dispatch = useDispatch<AppDispatch>();

  const createFormSchema = z.object({
    name: z.string().min(1, { message: "Please provide the form name" }),
    type: z.enum([FormTypeSelection.Standard, FormTypeSelection.Card]),
    organizationId: z.string(),
  });

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      type: "standard",
      organizationId: profile?.org?.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
    dispatch(createForm(values)).then(() => onClose());
  };

  useEffect(() => {
    if (profile?.org?.id) {
      form.setValue("organizationId", profile.org.id);
    }
  }, [profile?.org?.id, form]);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Create Form</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          Provide form type and name to create amazing form
        </DialogDescription>
        <div>
          <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)}>
              <FormLabel>Form Type</FormLabel>
              <div className="flex w-full px-12  justify-around">
                <FormTypeField
                  form={form}
                  defaultValue={FormTypeSelection.Standard}
                  Icon={FormInputIcon}
                />
                <FormTypeField
                  form={form}
                  defaultValue={FormTypeSelection.Card}
                  Icon={Diamond}
                />
              </div>
              <div className="pt-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Form Name</FormLabel>
                      <Input {...field} />
                    </FormItem>
                  )}
                />
              </div>
              <div className="pt-6">
                <Button>Save Form</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFormModal;
