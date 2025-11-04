import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

interface AuthState {
    token: string | null,
    isLoading: boolean,
    error: string | null
}

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    isLoading: false,
    error: null
}

export const registerUser = createAsyncThunk(
    "auth/register",
    async (credentials: {email: string, password: string}, {rejectWithValue}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            const data = await response.json()

            if(!response.ok) {
                if(data.messages) {
                    const errorMessage = Object.values(data.messages).flat().join(", ")
                    throw new Error(errorMessage)
                }
                throw new Error(data.message || "Не удалось зарегестрироваться")
            }
            return data
        } catch (error: any) {
            return rejectWithValue(error.message || "Не удалось зарегестрироваться")
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async(credentials: {email: string, password: string}, {rejectWithValue}) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            if(!response.ok) {
                if(data.messages) {
                    const errorMessage = Object.values(data.messages).flat().join(", ")
                    throw new Error(errorMessage)
                }
                throw new Error(data.message || "Не удалось авторизоваться")
            }
            return data
        } catch (error: any) {
            return rejectWithValue(error.message || "Не удалось авторизоваться")
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
            localStorage.removeItem("token")
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        //REGISTER
        .addCase(registerUser.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string || "Ошибка регистрации"
        })
        //LOGIN
        .addCase(loginUser.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload as string || "Ошибка авторизации"
            state.isLoading = false
        })
    }
})


export const {logout, clearError} = authSlice.actions
export default authSlice.reducer