import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { $authHost, $host } from "../../http/index.js";

const initialState = {
    user: {},
    isAuth: false,
};

// Функция логин
export const loginIn = createAsyncThunk(
    "api/user/login",
    async ({ login, password }, { rejectedWithValue, dispath }) => {
        const { data } = await $host.post("api/user/login", {
            login,
            password,
        });
        localStorage.setItem("token", data.token);
        return jwt_decode(data.token);
    }
);

// Функция проверки
export const check = createAsyncThunk("api/user/auth", async () => {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            let { login, role, id } = action.payload;
            state.user = {
                id: id,
                login: login,
                role: role,
            };
        },
        getUser: (state, action) => {
            return {
                login: state.user.login,
            };
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        extraReducers: {
            [check.pending]: () => console.log("pending"),
            [check.fulfilled]: () => console.log("fulfilled"),
            [check.rejected]: () => console.log("rejected"),
            [loginIn.pending]: () => console.log("pending"),
            [loginIn.fulfilled]: () => console.log("fulfilled"),
            [loginIn.rejected]: () => console.log("rejected"),
        },
    },
});

export const { setUser, getUser, setIsAuth } = userSlice.actions;
export default userSlice.reducer;
