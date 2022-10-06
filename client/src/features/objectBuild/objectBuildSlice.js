import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    objectsBuild: []
}

export const objectSlice = ({
    name: "objectsBuild",
    initialState,
    reducers: {
        addObject: (state, action) => {
            state.objectBuild.push(action.payload)
        }
    }
})


export const { addObject } = objectSlice.actions;
export default objectSlice.reducer;


/*
const initialState = {
    name: "",
    address: ""
}

export const objectSlice = createSlice({
    name: "objectBuild",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        }
    }
})


export const { setName } = objectSlice.actions;
export default objectSlice.reducer;*/
