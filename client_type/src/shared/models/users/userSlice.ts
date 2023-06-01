import jwt_decode from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import { IUser, IUserSlice } from "../../interfaces";
import { authApi } from "../../api/auth";

// Интерфейс для входа

// Задаём начальное значение
const initialState: IUserSlice = {
    isAuth: false,
    user: null,
    isLoading: false,
    isError: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem("token");
        },
    },

    extraReducers(builder) {
        builder.addMatcher(
            authApi.endpoints.login.matchPending,
            (state, action) => {
                state.isLoading = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action) => {
                const { token } = action.payload;
                const user: IUser = jwt_decode(token);
                localStorage.setItem("token", token);
                const { id, login, roles } = user;
                state.user = { id, login, roles };
                state.isAuth = true;
                state.isLoading = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.isAuth = false;
                localStorage.removeItem("token");
            }
        );
    },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;

// export const selectIsAuth = (state: RootState) => state.user.isAuth;
// export const selectUser = (state: RootState) => state.user.user;

// export const loginUser = createAsyncThunk(
//     "user/login",
//     async (userData: IUserLogin, { rejectWithValue, dispatch }) => {
//         try {
//             const { data } = await $host.post("/user/login", userData);
//             return data;
//         } catch (e) {
//             console.log("error");
//             throw new Error(e.message);
//         }
//     }
// );

// export const checkAuth = createAsyncThunk("user/check", async () => {
//     try {
//         const { data } = await $authHost.get("/user/check");
//         return data;
//     } catch (e) {
//         throw new Error(e.message);
//     }
// });
// // создаём слайс
// export const userSlice = createSlice({
//     name: "user", // Умя слайса
//     initialState, // Начальное состояние
//     reducers: {
//         setUser(state, action) {
//             state.user = action.payload;
//         },
//         setIsAuth(state, action) {
//             state.isAuth = action.payload;
//         },
//         setLoading(state, action) {
//             state.isLoading = action.payload;
//         },
//         setError(state, action) {
//             state.isError = action.payload;
//         },
//         logout(state) {
//             state.user = null;
//             state.isAuth = false;
//             localStorage.removeItem("token");
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(loginUser.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(loginUser.fulfilled, (state, action) => {
//             const { token } = action.payload;
//             console.log(token.status);
//             const user: IUser = jwt_decode(token);
//             localStorage.setItem("token", token);
//             const { id, login, roles } = user;
//             state.user = { id, login, roles };
//             state.isAuth = true;
//             state.isLoading = false;
//         });
//         builder.addCase(loginUser.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = true;
//         });

//         //
//         builder.addCase(checkAuth.pending, (state, action) => {
//             state.isLoading = true;
//         });
//         // Проверка
//         builder.addCase(checkAuth.fulfilled, (state, action) => {
//             const { token } = action.payload;
//             const user: IUser = jwt_decode(token);
//             localStorage.setItem("token", token);
//             const { id, login, roles } = user;
//             state.user = { id, login, roles };
//             state.isAuth = true;
//             state.isLoading = false;
//         });
//         // Ошибка
//         builder.addCase(checkAuth.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = true;
//         });
//     },
// });

// export const { setUser, setIsAuth, setLoading, setError, logout } =
//     userSlice.actions;
// export default userSlice.reducer;

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
