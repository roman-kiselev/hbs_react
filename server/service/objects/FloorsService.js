import pkg from "sequelize";
import sequelize from "../../db.js";
const { QueryTypes } = pkg;

class FloorsService {
    async getUniqueFloorsInSections(objectBuildId, numberSection) {
        try {
            const listFloors = await sequelize.query(
                `
            SELECT DISTINCT
            (floor)
        FROM
            hbs_react.main_meters
        WHERE
            objectBuildId = :objectBuildId AND section = :section
        ORDER BY floor ASC;
            `,
                {
                    replacements: {
                        objectBuildId,
                        section: numberSection,
                    },
                    type: QueryTypes.SELECT,
                }
            );

            return listFloors;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FloorsService();
