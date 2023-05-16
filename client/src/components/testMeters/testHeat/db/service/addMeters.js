import dbHeat from "../dbHeat";

const addMeter = async (meter) => {
    try {
        const result = await dbHeat.main.add(meter);
        return result;
    } catch (e) {
        console.log(e);
    }
};

export default addMeter;
