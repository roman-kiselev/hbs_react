import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {$authHost, $host} from "../../http/index.js";


const initialState = {
    objectsBuild: []
}


export const createObjects = createAsyncThunk('api/object', async (_, {rejectedWithValue, dispath}) => {
    const data = await $authHost.post('api/object')
    dispath(addObject(data))
})

export const getAllObjects = createAsyncThunk('api/object', async (_, {rejectedWithValue, dispath}) => {
    const {data} = await $authHost.get('api/object')
    console.log(data)
    dispath(addObject(data))
})



export const objectSlice = createSlice({
    name: "objectsBuild",
    initialState,
    reducers: {
        addObject: (state, action) => {
            console.log(action.payload)
            //state.objectsBuild.push(action.payload)
        },

        removeObject: (state, action) => {
            state.objectsBuild = state.objectsBuild.filter((obj) => obj.id !== action.payload)
        }
    }
})


export const { addObject, removeObject } = objectSlice.actions;
export default objectSlice.reducer;

