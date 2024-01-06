import { createSlice, current } from "@reduxjs/toolkit";
import { deskApi } from "../../api/desk";
import { metersApi } from "../../api/meters";

const initialState = {
    findedList: [],
    selectedItem: {},
    listDesk: [],
    isLoading: false,
    isError: false,
    isSuccess: true,
};

export const deskSlice = createSlice({
    name: "deskSlice",
    initialState,
    reducers: {
        resetList: (state) => {
            state.listDesk = [];
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            metersApi.endpoints.findByNumber.matchPending,
            (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
            }
        );
        builder.addMatcher(
            metersApi.endpoints.findByNumber.matchFulfilled,
            (state, action) => {
                state.findedList = action.payload;
                // state.listDesk = [...state.listDesk, action.payload];
                state.isLoading = false;
                state.isSuccess = true;
            }
        );
        builder.addMatcher(
            metersApi.endpoints.findByNumber.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }
        );
        ///
        builder.addMatcher(
            deskApi.endpoints.getAll.matchPending,
            (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
            }
        );
        builder.addMatcher(
            deskApi.endpoints.getAll.matchFulfilled,
            (state, action) => {
                if (action.payload !== null) {
                    state.listDesk = action.payload;
                    state.isLoading = false;
                    state.isSuccess = true;
                }
            }
        );
        builder.addMatcher(
            deskApi.endpoints.getAll.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }
        );
        ////
        builder.addMatcher(
            deskApi.endpoints.create.matchPending,
            (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
            }
        );
        builder.addMatcher(
            deskApi.endpoints.create.matchFulfilled,
            (state, action) => {
                state.listDesk = [...state.listDesk, action.payload];
                state.isLoading = false;
                state.isSuccess = true;
            }
        );
        builder.addMatcher(
            deskApi.endpoints.create.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }
        );
        /////
        builder.addMatcher(
            deskApi.endpoints.delete.matchPending,
            (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
            }
        );
        builder.addMatcher(
            deskApi.endpoints.delete.matchFulfilled,
            (state, action) => {
                state.listDesk = state.listDesk.filter(
                    (item) => item.id != action.payload
                );
                state.isLoading = false;
                state.isSuccess = true;
            }
        );
        builder.addMatcher(
            deskApi.endpoints.delete.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }
        );
        /////
        builder.addMatcher(
            deskApi.endpoints.changeStatus.matchPending,
            (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
            }
        );
        builder.addMatcher(
            deskApi.endpoints.changeStatus.matchFulfilled,
            (state, action) => {
                console.log(action.payload);
                console.log(current(state.listDesk));
                const findedIndex = state.listDesk.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.listDesk[findedIndex] = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            }
        );
        builder.addMatcher(
            deskApi.endpoints.changeStatus.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
            }
        );
    },
});

export const { resetList } = deskSlice.actions;
export const deskReducer = deskSlice.reducer;
