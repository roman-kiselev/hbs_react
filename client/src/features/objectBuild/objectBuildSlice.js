import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    objectsBuild: [
        {
            id: 1,
            img: "file",
            name: "Новые сады",
            address: "г. Пенза ул. Советская д.9"
        }
    ]
}

export const objectSlice = createSlice({
    name: "objectsBuild",
    initialState,
    reducers: {
        addObject: (state, action) => {
            state.objectsBuild.push(action.payload)
        },

        removeObject: (state, action) => {
            state.objectsBuild = state.objectsBuild.filter((obj) => obj.id !== action.payload)
        }
    }
})


export const { addObject, removeObject } = objectSlice.actions;
export default objectSlice.reducer;

