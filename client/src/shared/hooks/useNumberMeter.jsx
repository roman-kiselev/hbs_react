import { useState } from "react";
import { useSelector } from "react-redux";
import { metersApi } from "../api/meters";
const useNumberMeter = (
    initialValue,
    objectBuildId,
    typeMeter = "water" | "heat" | "electrical"
) => {
    const [value, setValue] = useState(initialValue);
    const [status, setStatus] = useState(false);
    const { number: preNumber } = useSelector((store) => store.electricalMeter);
    const { data, isLoading, refetch, isSuccess, isError } =
        metersApi.useCheckMeterQuery({
            number: typeMeter === "electrical" ? `${preNumber}${value}` : value,
            objectBuildId,
            typeMeter,
        });

    const handleInputChange = (e) => {
        const value = e.target.value;
        setValue(value);
    };

    return [value, setValue, handleInputChange, status, data];
};

export default useNumberMeter;
