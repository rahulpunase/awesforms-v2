import { FormInput } from "lucide-react";

import { cn } from "@/lib/utils";

const Logo = ({ size = "s" }: { size: "s" | "m" }) => {
  return (
    <div className="flex items-center justify-center text-zinc-800 w-full h-full">
      <FormInput
        className={cn(size === "s" && "w-8 h-8", size === "m" && "w-12 h-12")}
      />
    </div>
  );
};

export default Logo;
