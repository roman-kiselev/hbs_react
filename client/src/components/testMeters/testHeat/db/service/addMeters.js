import dbHeat from "../dbHeat";

const addMeter = async (meter) => {
    try {
        const result = await dbHeat.main.add(meter);
        if (result) {
            console.log(result);
        }
        return result;
    } catch (e) {
        console.log(e);
    }
};

export default addMeter;
