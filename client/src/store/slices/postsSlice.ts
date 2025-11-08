import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Post {
    id: number | null,
    title: string,
    excerpt: string
}


interface PostsState {
    posts: Post[],
    isLoading: boolean,
    error: string | null
}

const initialState: PostsState = {
    posts: [],
    isLoading: false,
    error: null
}

export const fetchAllPosts = createAsyncThunk(
    "post/fetchAllPosts",
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            if (!response.ok) {
                if(data.messages) {
                    const errorMessage = Object.values(data.messages).flat().join(", ")
                    throw new Error(errorMessage)
                }
                throw new Error(data.message || "Не удалось загрузить посты")
            }
            return data
        } catch (error: any) {
            return rejectWithValue(error.message || "Не удалось загрузить посты")
        }
    }
)

const postsSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        clearPostError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllPosts.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        .addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.isLoading = false
            const postData = action.payload.data || action.payload
            // postData.posts
            // state.posts = action.payload.posts
            if(Array.isArray(postData)) {
                state.posts = postData.map((post) => ({
                    id: post.id || "",
                    title: post.title || "",
                    excerpt: post.excerpt || ""
                }))
            }

        })
        .addCase(fetchAllPosts.rejected, (state, action) => {
            state.error = action.payload as string || "Ошибка загрузки постов"
            state.isLoading = false
        })
    }
})

export const {clearPostError} = postsSlice.actions
export default postsSlice.reducer