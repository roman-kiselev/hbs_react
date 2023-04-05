const Meters = sequelize.define("meters", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
});
// Создание счётчика
Meters.createMeter = async ({ name, typeId, brandId }) => {
    try {
        const meter = await Meters.create({ name, typeId, brandId });
        return meter;
    } catch (e) {
        console.error(e);
    }
};
// получение счётчиков
Meters.getMeters = async () => {
    try {
        const meters = await Meters.findAll();
        return meters;
    } catch (e) {
        console.error(e);
    }
};
// получение счётчика по id
Meters.getMeterById = async (id) => {
    try {
        const meter = await Meters.findByPk(id);
        return meter;
    } catch (e) {
        console.error(e);
    }
};

// Удаление счётчика
Meters.deleteMeter = async (id) => {
    try {
        const meter = await Meters.destroy({ where: { id } });
        return meter;
    } catch (e) {
        console.error(e);
    }
};
// Обновление счётчика
Meters.updateMeter = async (dataMeter) => {
    try {
        const { id } = dataMeter;
        const meter = await Meters.findByPk(id);
        const {
            name = name ? name : meter.name,
            typeId = typeId ? typeId : meter.typeId,
            brandId = brandId ? brandId : meter.brandId,
        } = dataMeter;

        await meter.update({ name, typeId, brandId });
        return meter;
    } catch (e) {
        console.error(e);
    }
};

export default Meters;
