import { Sequelize } from "sequelize/types";
import sequelize from "../db";

const Section = sequelize.define("section", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  from: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  to: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  flat: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  office: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  flatInFloor: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  pipes: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});
// Создаём секцию в базе данных
Section.createSection = async ({ number, objectBuildId }) => {
  try {
    const section = await Section.create({ number, objectBuildId });
    return section;
  } catch (e) {
    console.error(e);
  }
};

// Получаем одну секцию по id
Section.getSectionById = async (id) => {
  try {
    const section = await Section.findByPk(id);
    return section;
  } catch (e) {
    console.error(e);
  }
};
// Получаем все секции по id объекта
Section.getAllSectionByObjectId = async (objectBuildId) => {
  try {
    const sections = await Section.findAll({
      where: { objectBuildId },
    });
    return sections;
  } catch (e) {
    console.error(e);
  }
};
// Редактирование данных секции
Section.updateSectionById = async (dataSection) => {
  try {
    // Сначала деструктурируем id
    const { id } = dataSection;
    const section = await Section.findByPk(id);
    // Далее проверяем наличие данных
    let {
      number = number ? number : section.number,
      from = from ? from : section.from,
      to = to ? to : section.to,
      flat = flat ? flat : section.flat,
      office = office ? office : section.office,
      flatInFloor = flatInFloor ? flatInFloor : section.flatInFloor,
      pipes = pipes ? pipes : section.pipes,
    } = dataSection;
    // Обновляем данные
    await section.update({
      number: section.number,
      from: section.from,
      to: section.to,
      flat: section.flat,
      office: section.office,
      flatInFloor: section.flatInFloor,
      pipes: section.pipes,
    });

    return section;
  } catch (e) {
    console.error(e);
  }
};

Section.deleteSectionById = async (id) => {
  try {
    const section = await Section.findByPk(id);
    await section.destroy();
    return section;
  } catch (e) {
    console.error(e);
  }
};

export default Section;
