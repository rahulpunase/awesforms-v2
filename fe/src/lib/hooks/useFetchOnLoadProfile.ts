import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { saveUserId } from "@/store/slice/profile/profile.slice";
import { fetchProfile } from "@/store/slice/profile/profile.thunk";
import { AppDispatch, RootState } from "@/store/store";

const useFetchOnLoadProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuth();
  const { user } = useUser();

  const { isLoading, profile } = useSelector(
    (store: RootState) => store.profile
  );

  useEffect(() => {
    if (userId && !profile) {
      dispatch(saveUserId(userId));
      dispatch(
        fetchProfile({
          email: user?.emailAddresses[0].emailAddress ?? "",
          imageUrl: user?.imageUrl ?? "",
          name: `${user?.firstName} ${user?.lastName}`,
        })
      );
    }
  }, [userId, profile, dispatch, user]);

  return [isLoading, profile] as const;
};

export default useFetchOnLoadProfile;
