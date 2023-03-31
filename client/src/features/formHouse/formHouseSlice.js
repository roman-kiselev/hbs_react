import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formHouse: [],
};

export const formHouseSlice = createSlice({
  name: "formHouse",
  initialState,
  reducers: {
    setFormHouse: (state, action) => {
      state.formHouse = action.payload;
    },
    // Делаем прибор активным
    setActive: (state, action) => {
      state.formHouse.forEach((item) => {
        if (item.numberSection === action.payload) {
          item.active = !item.active;
        } else {
          item.active = false;
        }
      });
    },
  },
});

export const { setFormHouse, setActive } = formHouseSlice.actions;
export default formHouseSlice.reducer;
