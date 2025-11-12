import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Comment {
    id: number,
    post_id: number,
    author_name: string,
    comment: string,
    created_at: string
}

interface CommentsState {
    comments: Comment[],
    isLoading: boolean,
    error: string | null
}

const initialState: CommentsState = {
    comments: [],
    isLoading: false,
    error: null
}

export const fetchPostComments = createAsyncThunk(
    "comments/fetchPostComments",
    async(postId: number, {rejectWithValue}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
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
                throw new Error(data.message || "Не удалось загрузить комментарии")
            }
            return data
        } catch (error: any) {
            return rejectWithValue(error.message || "Не удалось загрузить комментарии")
        }
    }
)
export const createComment = createAsyncThunk(
    "comments/createComment",
    async ({ postId, author_name, comment }: { 
        postId: number; 
        author_name: string; 
        comment: string; 
    }, {getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState
            const token = state.auth.token

            if(!token) {
                throw new Error("Отсутствует токен")
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({full_name: author_name, comment})
            })

            const data = await response.json();
            if (!response.ok) {
                if (data.messages) {
                    const errorMessage = Object.values(data.messages).flat().join(", ");
                    throw new Error(errorMessage);
                }
                throw new Error(data.message || "Не удалось создать комментарий");
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Не удалось оставить отзыв")
        }
    }
)
const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        clearCommentsError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        //FETCH POST COMMENTS
        .addCase(fetchPostComments.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        .addCase(fetchPostComments.fulfilled, (state, action) => {
            state.isLoading = false
            const commentsData = action.payload || action.payload.data

            if(Array.isArray(commentsData)) {
                state.comments = commentsData.map((comment) => ({
                    id: comment.id || null,
                    post_id: comment.post_id || null,
                    author_name: comment.author_name || comment.full_name || "",
                    comment: comment.comment || "",
                    created_at: comment.created_at || "" 
                }))
            }

        })
        .addCase(fetchPostComments.rejected, (state, action) => {
            state.error = action.payload as string || "Не удалось загрузить комментарии"
            state.isLoading = false
        })

        //CREATE COMMENT
        .addCase(createComment.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(createComment.fulfilled, (state, action) => {
            state.isLoading = false
            const newComment = action.payload || action.payload.data
            const commentToAdd = {
                id: newComment.id,
                post_id: newComment.post_id,
                author_name: newComment.author_name || newComment.full_name || "",
                comment: newComment.comment,
                created_at: newComment.created_at
            }
            
            state.comments.push(commentToAdd)
        })
        .addCase(createComment.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string || "Неу удалось добавить отзыв"
        })
    }

}
)

export const {clearCommentsError} = commentsSlice.actions
export default commentsSlice.reducer