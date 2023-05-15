import Dexie from "dexie";

export const dbHeat = new Dexie("heatDatabase");
dbHeat.version(1).stores({
    main: "++id,section, floor, flat, office, line, typeMeter, numberMeter, sumMeter, comment",
});

export default dbHeat;
