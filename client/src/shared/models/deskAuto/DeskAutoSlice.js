import { createSlice } from "@reduxjs/toolkit";
import { metersApi } from "../../api/meters";

const initialState = {
    invalidWater: {
        list: [],
        number: 8,
        currentPage: 1,
        perPage: 10,
        totalCount: 0,
        limit: 10,
    },
    invalidHeat: {
        list: [],
        number: 8,
        currentPage: 1,
        perPage: 10,
        totalCount: 0,
        limit: 6,
    },
    invalidElectrical: {
        list: [],
        number: 15,
        currentPage: 1,
        perPage: 10,
        totalCount: 0,
        limit: 6,
    },
    repeatingNumbers: {
        list: [],
        currentPage: 1,
        perPage: 10,
        totalCount: 0,
        limit: 6,
    },
};

export const deskAutoSlice = createSlice({
    name: "deskAutoSlice",
    initialState,
    reducers: {
        setInvalidWater: (state, action) => {
            state.invalidWater.number = action.payload;
        },
        setInvalidHeat: (state, action) => {
            state.invalidHeat.number = action.payload;
        },
        setInvalidElectrical: (state, action) => {
            state.invalidElectrical.number = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            metersApi.endpoints.getInvalidElectricalMeters.matchFulfilled,
            (state, action) => {
                state.invalidElectrical.list = action.payload;
            }
        );
        builder.addMatcher(
            metersApi.endpoints.getInvalidWaterMeters.matchFulfilled,
            (state, action) => {
                state.invalidWater.list = action.payload;
            }
        );
        builder.addMatcher(
            metersApi.endpoints.getInvalidHeatMeters.matchFulfilled,
            (state, action) => {
                state.invalidHeat.list = action.payload;
            }
        );
        builder.addMatcher(
            metersApi.endpoints.getRepeatingMeters.matchFulfilled,
            (state, action) => {
                state.repeatingNumbers.list = action.payload;
            }
        );

        // builder.addCase(
        //     getOneMeter.fulfilled, (state, action) => {
        //         // Получить индекс и заменить!
        //         const index = state.invalidWater.list.findIndex(
        //             (item) => item.number === action.payload.number
        //         )
        //         const findAndReplace = (state, id) => {

        //         }

        //         if (action.payload.typeMeter === "water") {
        //             state.invalidWater.list = action.payload;
        //         } else if (action.payload.typeMeter === "heat") {
        //             state.invalidHeat.list = action.payload;
        //         } else if (action.payload.typeMeter === "electrical") {
        //             state.invalidElectrical.list = action.payload;
        //         }
        //     }
        // )
        // [getOneMeter.fulfilled]: (state, action) => {

        // },
    },
});

export const deskAutoReducer = deskAutoSlice.reducer;
export const { setInvalidWater, setInvalidElectrical, setInvalidHeat } =
    deskAutoSlice.actions;
