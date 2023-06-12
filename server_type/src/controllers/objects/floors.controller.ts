import { CreateFloorsDto } from "../../dto";
import ApiError from "../../lib";
import { Floors } from "../../models";

class FloorsService {
    async createFloors(id: number, dto: CreateFloorsDto) {
        try {
            const floor = await Floors.create({
                value: dto.value,
                sectionId: id,
            });
            if (!floor) {
                return ApiError.badRequest("Не удаётся создать этаж");
            }
            return floor;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FloorsService();
