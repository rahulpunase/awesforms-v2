import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPublicForm } from "@/lib/apis/form";
import { FormDetails } from "@/models";

const useFetchMetaFormDetails = () => {
  const params = useParams();
  const [formDetails, setFormDetails] = useState<FormDetails | null>(null);
  useEffect(() => {
    const getFormOnLoad = async () => {
      if (!params.formId) {
        return;
      }
      const response = await getPublicForm(params.formId);
      setFormDetails(response.formDetails);
    };
    getFormOnLoad();
  }, []);

  return formDetails;
};

export default useFetchMetaFormDetails;
