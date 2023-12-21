import { CheckCircle, Circle, LucideIcon } from "lucide-react";

import { FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";

const FormTypeField = ({
  form,
  defaultValue,
  Icon,
}: {
  form: any;
  defaultValue: string;
  Icon: LucideIcon;
}) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <div className="flex flex-col">
          <FormItem
            className={cn(
              "flex items-center justify-center w-[120px] h-[150px] bg-slate-200 rounded-sm shadow-sm cursor-pointer relative",
              field.value === defaultValue && "border-2 border-zinc-700"
            )}
            onClick={() => form.setValue("type", defaultValue)}
          >
            <div className="absolute top-2 right-2">
              {field.value === defaultValue ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </div>
            <div>
              <Icon className="w-8 h-8" />
            </div>
          </FormItem>
          <div
            className={cn(
              "uppercase text-center pt-2 text-zinc-700",
              field.value === defaultValue && "font-semibold"
            )}
          >
            {defaultValue}
          </div>
        </div>
      )}
    />
  );
};

export default FormTypeField;
