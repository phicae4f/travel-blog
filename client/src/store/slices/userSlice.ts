import { createSlice } from "@reduxjs/toolkit"

interface UserState {
    id: number | null,
    full_name: string,
    city: string,
    country: string,
    bio: string,
    photo: string,
    isLoading: boolean,
    error: string | null
}

const initialState: UserState = {
    id: null,
    full_name: "",
    city: "",
    country: "",
    bio: "",
    photo: "",
    isLoading: false,
    error: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserProfile: (state) => {
      state.id = null;
      state.full_name = "";
      state.city = "";
      state.country = "";
      state.bio = "";
      state.photo = "";
    }
  },
})

export const {clearUserError,clearUserProfile} = userSlice.actions
export default userSlice.reducer