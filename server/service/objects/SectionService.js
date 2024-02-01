import pkg from "sequelize";
import sequelize from "../../db.js";
const { QueryTypes } = pkg;

class SectionService {
    async getUniqueSections(objectBuildId) {
        try {
            const section = await sequelize.query(
                `
            SELECT DISTINCT
                (section)
            FROM
                hbs_react.main_meters
            WHERE
                objectBuildId = :objectBuildId;
            `,
                {
                    replacements: {
                        objectBuildId,
                    },
                    type: QueryTypes.SELECT,
                }
            );

            return section;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new SectionService();
