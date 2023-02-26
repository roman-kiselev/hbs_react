import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coolBolidList: [
        {
            id: 1,
            section: 1,
            floors: 5,
            flat: 100,
            kdl: 2,
            asr: 45,
            numberMeter: 84375393,
            sum: 0.12
        },
        {
            id: 2,
            section: 1,
            floors: 5,
            flat: 99,
            kdl: 2,
            asr: 45,
            numberMeter: 84375393,
            sum: 0.12
        },
        {
            id: 3,
            section: 1,
            floors: 5,
            flat: 90,
            kdl: 2,
            asr: 45,
            numberMeter: 84375393,
            sum: 0.12
        },
        {
            id: 5,
            section: 1,
            floors: 5,
            flat: 95,
            kdl: 3,
            asr: 45,
            numberMeter: 84375393,
            sum: 0.12
        }
    ]
}


export const coolWaterBildSlice = createSlice({
    name: "coolBolid",
    initialState,
    reducers: {
        addCoolBolid: (state, action) => {

        },

        removeCoolBolid: (state, action) => {

        }
    }
})

export const {addCoolBolid, removeCoolBolid} = coolWaterBildSlice.actions;
export default coolWaterBildSlice.reducer;