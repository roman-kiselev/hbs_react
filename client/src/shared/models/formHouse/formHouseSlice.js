import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formHouse: [],
    formHome: [],
    home: [
        {
            section: {
                number: 1,
                typeAsr: ["ASR2"],
                floors: [
                    {
                        number: 1,
                        lines: [
                            {
                                number: 1,
                                typeAsr: "ASR2",
                                channel: [
                                    {
                                        number: 1,
                                        typeAsr: "ASR2",
                                        numberMeter: "1234541",
                                        typeMeter: "Счётчик холодной воды",
                                        sumMeter: "0.1",
                                    },
                                    {
                                        number: 2,
                                        typeAsr: "ASR2",
                                        numberMeter: "1234541",
                                        typeMeter: "Счётчик горячей воды",
                                        sumMeter: "0.1",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        number: 2,
                        lines: [
                            {
                                number: 1,
                                typeAsr: "ASR2",
                            },
                        ],
                    },
                    {
                        number: 3,
                        lines: [
                            {
                                number: 1,
                                typeAsr: "ASR2",
                            },
                        ],
                    },
                ],
            },
        },
    ],
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

        // Подсчёт дома
        setHome: (state, action) => {},
    },
});

export const { setFormHouse, setActive } = formHouseSlice.actions;
export const formHouseReducer = formHouseSlice.reducer;
