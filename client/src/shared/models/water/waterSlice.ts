import { createSlice } from "@reduxjs/toolkit";
import { waterApi } from "../../api/water";

const initialState = {
    listMeters: [],
    listMetersRadio: [],
    selectedFloors: null,
};

export const waterSlice = createSlice({
    initialState,
    name: "water",
    reducers: {
        setSelectedfloors: (state, action) => {
            state.selectedFloors = action.payload;
        },
        setArrRadio: (state, action) => {
            // const currentArr = current(state.listMetersRadio).map(
            //     (item) => item
            // );
            // const newArr = currentArr.map((item) => {
            //     return {
            //         line: item.line,
            //         meter: item.meter,
            //         status: item.status,
            //     };
            // });
            // console.log(currentArr);
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            waterApi.endpoints.getLineMeterOneFloor.matchFulfilled,
            (state, action) => {
                state.listMetersRadio = action.payload;
            }
        );
    },
});

export const { setSelectedfloors, setArrRadio } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
