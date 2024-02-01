import pkg from "sequelize";
import sequelize from "../../db.js";
const { QueryTypes } = pkg;
class StatusRadioService {
    async create(mainMeterId, status, comment, signal, objectBuildId) {
        try {
            const oneStatus = await sequelize.query(
                `
                INSERT INTO hbs_react.status_radios (status,signalStatus, comment, createdAt, updatedAt, mainMeterId, objectBuildId)
                values (:status,:signalStatus, :comment,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ,:mainMeterId, :objectBuildId);
            `,
                {
                    replacements: {
                        mainMeterId,
                        status: Boolean(Number(status)),
                        signalStatus: Number(signal),
                        comment: comment === "" ? null : comment,
                        objectBuildId,
                    },
                    type: QueryTypes.INSERT,
                }
            );

            const [newlyInsertedRow] = await sequelize.query(
                `
                SELECT * FROM hbs_react.status_radios WHERE id = LAST_INSERT_ID();
                `,
                {
                    type: QueryTypes.SELECT,
                }
            );

            return newlyInsertedRow;
        } catch (e) {
            console.log(e);
        }
    }

    async getCurrentStatus(mainMeterId) {
        try {
            const [status] = await sequelize.query(
                `
                SELECT 
                *
            FROM
                hbs_react.status_radios
            WHERE
                mainMeterId = :mainMeterId
            ORDER BY createdAt DESC
            LIMIT 1;
            `,
                {
                    replacements: {
                        mainMeterId,
                    },
                    type: QueryTypes.SELECT,
                }
            );
            return status;
        } catch (e) {
            console.log(e);
        }
    }

    async getLastStatusForOneMeter(mainMeterId) {
        try {
            const arrLastStatus = await sequelize.query(
                `
            SELECT 
                    *
                FROM
                    hbs_react.status_radios
                WHERE
                    mainMeterId = :mainMeterId
                ORDER BY id DESC
                LIMIT 5;
            `,
                {
                    replacements: {
                        mainMeterId,
                    },
                    type: QueryTypes.SELECT,
                }
            );

            return arrLastStatus;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new StatusRadioService();
