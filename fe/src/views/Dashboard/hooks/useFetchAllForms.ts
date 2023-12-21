import { fetchAllForms } from "@/store/slice/builder/builder.thunk";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchAllForms = () => {
  const { profile } = useSelector((store: RootState) => store.profile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (profile?.org?.id) {
      dispatch(fetchAllForms(profile?.org?.id));
    }
  }, [dispatch, profile?.org?.id]);
};

export default useFetchAllForms;
