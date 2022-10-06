import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    objectsBuild: []
}

export const objectSlice = createSlice({
    name: "objectsBuild",
    initialState,
    reducers: {
        addObject: (state, action) => {
            state.objectsBuild.push(action.payload)
        }
    }
})


export const { addObject } = objectSlice.actions;
export default objectSlice.reducer;

