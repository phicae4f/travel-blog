import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import type { RootState } from "../store"

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

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

    if(!token) {
      throw new Error("Отсутствует токен")
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json()
    if(!response.ok) {
      if(data.messages) {

        const errorMessage = Object.values(data.messages).flat().join(", ")
        throw new Error(errorMessage)
      }
      throw new Error(data.message || "Не удалось загрузить данные профиля")

    }
    return data
    } catch (error: any) {
      return rejectWithValue(error.message || "Не удалось загрузить данные профиля")
    }
  }
)
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async(updateData: {full_name?: string, city?: string, bio?: string, photo?: File, password?: string}, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token

      if(!token) {
        throw new Error("Отсутствует токен")
      }

      const formData = new FormData()

      if(updateData.full_name !== undefined) formData.append("full_name", updateData.full_name)
      if(updateData.city !== undefined) formData.append("city", updateData.city)
      if(updateData.bio !== undefined) formData.append("bio", updateData.bio)
      if(updateData.photo !== undefined) formData.append("photo", updateData.photo)
      if(updateData.password !== undefined) formData.append("password", updateData.password)


      const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })

      const data = await response.json()
      if(!response.ok) {
        if(data.messages) {

          const errorMessage = Object.values(data.messages).flat().join(", ")
          throw new Error(errorMessage)
        }
        throw new Error(data.message || "Не удалось обновить профиль")

      }
    return data.data || data 
    } catch (error: any) {
      return rejectWithValue(error.message || "Не удалось обновить профиль")
    }
  }
)


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
  extraReducers: (builder) => {
    //FETCH PROFILE
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false

        const userData = action.payload.data || action.payload;
        state.id = userData.id || null;
        state.full_name = userData.full_name || "";
        state.city = userData.city || "";
        state.country = userData.country || "";
        state.bio = userData.bio || "";

        if (userData.photo) {
          if(userData.photo.startsWith("http")) {
             state.photo = userData.photo;
          } else {
            state.photo = userData.photo;
          }
        } else {
          state.photo = ""
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload as string || "Ошибка загрузки профиля"
        state.isLoading = false
      })

      //UPDATE PROFILE
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        
        const updatedData = action.payload.data || action.payload
        if (updatedData.full_name !== undefined) state.full_name = updatedData.full_name;
        if (updatedData.city !== undefined) state.city = updatedData.city;
        if (updatedData.country !== undefined) state.country = updatedData.country;
        if (updatedData.bio !== undefined) state.bio = updatedData.bio;


        if (updatedData.photo !== undefined) {
          if(updatedData.photo.startsWith("http")) {
             state.photo = updatedData.photo;
          } else {
            state.photo = updatedData.photo;
          }
        }

        // Или если сервер возвращает полный объект пользователя
        if (updatedData.id) state.id = updatedData.id;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload as string || "Ошибка обновления профиля"
        state.isLoading = false
      })
  }
})

export const {clearUserError,clearUserProfile} = userSlice.actions
export default userSlice.reducer