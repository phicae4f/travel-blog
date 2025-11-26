import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface Post {
    id: number | null,
    title: string,
    excerpt?: string,
    description?: string,
    country: string,
    city: string,
    photo?: string
}


interface PostsState {
    posts: Post[],
    currentPost: Post | null,
    isLoading: boolean,
    error: string | null
}

const initialState: PostsState = {
    posts: [],
    currentPost: null,
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

export const createPost = createAsyncThunk(
    "posts/createPost",
    async ({title, description, country, city, photo}: {title: string, description: string, country: string, city: string, photo: File}, {getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState
            const token = state.auth.token

            if(!token) {
                throw new Error("Отсутствует токен")
            }
            const formData = new FormData()
            formData.append("title", title)
            formData.append("description", description)
            formData.append("country", country)
            formData.append("city", city)
            formData.append("photo", photo)

            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })

            const data = await response.json()
            if (!response.ok) {
                if (data.messages) {
                    const errorMessage = Object.values(data.messages).flat().join(", ");
                    throw new Error(errorMessage);
                }
                throw new Error(data.message || "Не удалось создать комментарий");
            }
            return data
        } catch (error: any) {
            return rejectWithValue(error.message || "Не удалось создать пост")
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
            const postData = action.payload.data || action.payload
            state.currentPost = {
                id: postData.id || "",
                title: postData.title || "",
                description: postData.description || "",
                country: postData.country || "",
                city: postData.city || "",
            }
        })
        .addCase(fetchPostById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string || "Ошибка загрузки поста"
        })
        // CREATE POST
        .addCase(createPost.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.isLoading = false

            const newPost = action.payload || action.payload.data
            const postToAdd = {
                id: newPost.id,
                title: newPost.title,
                description: newPost.description,
                country: newPost.country,
                city: newPost.city,
                photo: newPost.photo
            }
            state.posts.push(postToAdd)
        })
        .addCase(createPost.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string || "Не удалось создать пост"
        })
    }
})

export const {clearPostError} = postsSlice.actions
export default postsSlice.reducer