import { createSlice } from "@reduxjs/toolkit";

import { ProfileSliceInitialState } from "@/models";

import { fetchProfile, updateOrganization } from "./profile.thunk";

const initialState: ProfileSliceInitialState = {
  isProfileFetching: true,
  isLoading: true,
  profile: null,
  userId: "",
};
const ProfileSlice = createSlice({
  initialState: initialState,
  name: "profile",
  reducers: {
    saveUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    /**--------fetchProfile--------**/
    builder.addCase(fetchProfile.pending, (state) => {
      state.isProfileFetching = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.isProfileFetching = false;
    });
    // builder.addCase(fetchProfile.rejected, (state) => {
    //   console.log("rejected...");

    //   state.profile = null;
    //   state.isProfileFetching = false;
    // });
    /**--------fetchProfile--------**/

    /**--------updateOrganization--------**/
    builder.addCase(updateOrganization.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateOrganization.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log({ action });
      state.profile = action.payload.profile;
    });
    builder.addCase(updateOrganization.rejected, (state) => {
      state.isLoading = false;
    });
    /**--------updateOrganization--------**/
  },
});

export default ProfileSlice.reducer;

export const { saveUserId } = ProfileSlice.actions;
