import { addPageToSelectedForm } from "@/store/slice/builder/builder.slice";
import { fetchFormFromFormId } from "@/store/slice/builder/builder.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const useFetchForm = () => {
  const { profile } = useSelector((store: RootState) => store.profile);
  const { selectedForm } = useSelector((store: RootState) => store.builder);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  useEffect(() => {
    if (profile?.org?.id && !selectedForm) {
      dispatch(
        fetchFormFromFormId({
          organizationId: profile.org?.id || "",
          formId: params.formId || "",
        })
      );
    }

    if (selectedForm && !selectedForm?.pages?.length) {
      dispatch(addPageToSelectedForm());
    }
  }, [profile?.org, selectedForm, dispatch, params.formId]);
};
