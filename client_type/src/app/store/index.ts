import {
    combineReducers,
    configureStore,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import {
    createObjectReducer,
    leftMenuReducer,
    oneUserReducer,
    rolesReducer,
    userReducer,
} from "../../shared/models";
import { useDispatch } from "react-redux";
import { api, objectsMainApi } from "../../shared/api/main";
import { authApi } from "../../shared/api/auth";
import { listUserReducer } from "../../shared/models/users/listUsersSlice";
import { objectsApi } from "../../shared/api";
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        if (action.payload.token) {
            localStorage.setItem("token", action.payload.token);
        }
    },
});

const rootReducer = combineReducers({
    user: userReducer,
    listUser: listUserReducer,
    oneUser: oneUserReducer,
    roles: rolesReducer,
    leftMenu: leftMenuReducer,
    createObject: createObjectReducer,
    [api.reducerPath]: api.reducer,
    [objectsMainApi.reducerPath]: objectsMainApi.reducer,
});
const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware()
            .concat(api.middleware, objectsMainApi.middleware)
            .prepend(listenerMiddleware.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
