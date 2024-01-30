import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectUserProfile } from "@/store/slice/profile/profile.selectors";
import { AppDispatch } from "@/store/store";

import { fetchFormFromFormId } from "../store/builder/builder.thunk";

export const useFetchForm = () => {
  const profile = useSelector(selectUserProfile);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  useEffect(() => {
    if (profile?.org?.id) {
      dispatch(
        fetchFormFromFormId({
          organizationId: profile.org?.id || "",
          formId: params.formId || "",
        })
      );
    }
  }, []);
};
