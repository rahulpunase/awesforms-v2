import { Separator } from "@radix-ui/react-separator";

import ActualForm from "@/components/ActualForm";

import useFetchMetaFormDetails from "./hooks/useFetchMetaFormDetails";

const Form = () => {
  const formDetails = useFetchMetaFormDetails();
  if (!formDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center">
      <div className="w-[50%] mt-10">
        <div className="bg-zinc-100 p-6 rounded-sm mb-10">
          <div className="text-lg font-semibold">{formDetails.displayName}</div>
          <Separator
            orientation="horizontal"
            className="bg-zinc-200 w-100 h-[1px] mt-3"
          />
          <ActualForm formDetails={formDetails} />
        </div>
      </div>
    </div>
  );
};

export default Form;
