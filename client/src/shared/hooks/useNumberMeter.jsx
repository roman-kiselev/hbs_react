import { useState } from "react";
import { metersApi } from "../api/meters";

const useNumberMeter = (
    initialValue,
    objectBuildId,
    typeMeter = "water" | "heat" | "electrical"
) => {
    const [value, setValue] = useState(initialValue);
    const [status, setStatus] = useState(true);

    const { data, isLoading, refetch, isSuccess, isError } =
        metersApi.useCheckMeterQuery({
            number: value,
            objectBuildId,
            typeMeter,
        });
    console.log(data);
    // if (data === null) {
    //     setStatus(false);
    // }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setValue(value);
        // refetch();
        if (data !== null) {
            setStatus(false);
        } else {
            setStatus(true);
        }
    };

    return [value, setValue, handleInputChange, status];
};

export default useNumberMeter;
