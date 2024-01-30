import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectIsFormLoading,
  selectUserForms,
  selectUserProfile,
} from "@/store/slice/profile/profile.selectors";
import { fetchAllForms } from "@/store/slice/profile/profile.thunk";
import { AppDispatch } from "@/store/store";

const useFetchAllForms = () => {
  const profile = useSelector(selectUserProfile);
  const forms = useSelector(selectUserForms);
  const loading = useSelector(selectIsFormLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (profile?.org?.id) {
      dispatch(fetchAllForms(profile?.org?.id));
    }
  }, [dispatch, profile?.org?.id]);

  return [forms, loading] as const;
};

export default useFetchAllForms;
