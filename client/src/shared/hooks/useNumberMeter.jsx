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

    if (data === null) {
        setStatus(false);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setValue(value);
        // refetch();
    };

    return [value, setValue, handleInputChange, status];
};

export default useNumberMeter;
