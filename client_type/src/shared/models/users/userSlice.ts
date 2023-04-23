import axios from "axios";
import jwt_decode from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $host, $authHost } from "../../api";

interface IRole {
    id: number;
    name: string;
}

interface IUser {
    id: number;
    login: string;
    role: IRole[];
}

interface IUserSlice {
    user: IUser | null;
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
}

interface IUserLogin {
    login: string;
    password: string;
}

const initialState: IUserSlice = {
    isAuth: false,
    user: null,
    isLoading: false,
    isError: false,
};

export const loginUser = createAsyncThunk(
    "user/login",
    async (userData: IUserLogin) => {
        const { login, password } = userData;
        try {
        } catch (e) {}
    }
);

// export const loginUser = createAsyncThunk(
//     "user/login",
//     async (userData: { login: string, password: string }) => {
//       const { login, password } = userData;
//       try {
//         const response = await $host.post("/api/auth/login", { login, password });
//         return response.data;
//       } catch (e) {
//         throw new Error(e.response.data.message);
//       }
//     }
//   );

//   export const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//       setUser(state, action) {
//         state.user = action.payload;
//       },
//       setIsAuth(state, action) {
//         state.isAuth = action.payload;
//       },
//       setLoading(state, action) {
//         state.isLoading = action.payload;
//       },
//       setError(state, action) {
//         state.isError = action.payload;
//       },
//       logout(state) {
//         state.user = null;
//         state.isAuth = false;
//       },
//     },
//     extraReducers: (builder) => {
//       builder.addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       });
//       builder.addCase(loginUser.fulfilled, (state, action) => {
//         const token = action.payload.token;
//         localStorage.setItem("token", token);
//         const { id, login, role } = jwt_decode(token);
//         state.user = { id, login, role };
//         state.isAuth = true;
//         state.isLoading = false;
//       });
//       builder.addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         alert(action.error.message);
//       });
//     },
//   });

//   export const { setUser, setIsAuth, setLoading, setError, logout } = userSlice.actions;

//   export default userSlice.reducer;
