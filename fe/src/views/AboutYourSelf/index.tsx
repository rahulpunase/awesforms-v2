import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { updateOrganization } from "@/store/slice/profile/profile.thunk";

import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";
import { APP_PATHS } from "@/lib/configs/router-config/constants";
import { useEffect } from "react";

const formSchema = z.object({
  orgName: z.string().min(1, {
    message: "Please provide organization name",
  }),
});

const AboutYourSelf = () => {
  const { profile } = useSelector((store: RootState) => store.profile);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await dispatch(updateOrganization(values));
    navigate(APP_PATHS.Dashboard);
  };

  const isOrgNotAvailable = !profile?.org?.id;

  useEffect(() => {
    form.setValue("orgName", profile?.org?.name ?? "");
  }, [profile]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="form rounded-sm bg-zinc-100 p-8 shadow-lg">
        <div className="font-semibold text-4xl text-zinc-800">
          {isOrgNotAvailable ? "Welcome," : "Hi,"} {profile?.name}
        </div>
        <div className="pt-2 pb-6 text-zinc-800">
          {isOrgNotAvailable
            ? "Tell us something about yourself"
            : "Update your details here"}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="orgName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">
                      Your Organization
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of your organization."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-6">
              <Button type="submit">Save and proceed</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AboutYourSelf;
