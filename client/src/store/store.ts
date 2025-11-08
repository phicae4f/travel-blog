import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import userSlice from "./slices/userSlice"
import postsSlice from "./slices/postsSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        posts: postsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch