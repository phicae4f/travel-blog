import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import userSlice from "./slices/userSlice"
import postsSlice from "./slices/postsSlice"
import commentsSlice from "./slices/commentsSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        posts: postsSlice,
        comments: commentsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch