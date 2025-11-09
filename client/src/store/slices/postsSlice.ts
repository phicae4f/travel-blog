import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Post {
    id: number | null,
    title: string,
    excerpt: string,
    country: string,
    city: string
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

export const fetchPostById = createAsyncThunk(
    "post/fetchPostById",
    async (postId: number, {rejectWithValue}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()

            if(!response.ok) {
                if(data.messages) {
                    const errorMessage = Object.values(data.messages).flat().join(", ")
                    throw new Error(errorMessage)
                }
                throw new Error(data.message || "Не удалось загрузить пост")
            }

            return data
        } catch (error: any) {
            return rejectWithValue(error.message || "Не удалось загрузить пост")
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
        //FETCH ALL POSTS
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
                    excerpt: post.excerpt || "",
                    country: post.country || "",
                    city: post.city || "",
                }))
            }

        })
        .addCase(fetchAllPosts.rejected, (state, action) => {
            state.error = action.payload as string || "Ошибка загрузки постов"
            state.isLoading = false
        })

        //FETCH POST BY ID
        .addCase(fetchPostById.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(fetchPostById.fulfilled, (state, action) => {
            state.isLoading = false
        })
    }
})

export const {clearPostError} = postsSlice.actions
export default postsSlice.reducer