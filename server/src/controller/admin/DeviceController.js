import Devices from "../../models/Devices.js";
class DeviceController {
    async createDevice(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res
                    .status(400)
                    .json({ message: "Не задано название устройства" });
            }
            const { device, error, status } = await Devices.createDevice({
                name,
            });
            if (error) {
                return res.status(status).json({ message: error });
            }
            return res.status(201).json({ device });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async getOneDeviceById(req, res) {
        try {
            const { id } = req.params;
            const { device, error, status } = await Devices.getOneDeviceById(
                id
            );
            if (error) {
                return res.status(status).json({ message: error });
            }
            return res.status(200).json({ device });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async getAllDevices(req, res) {
        try {
            const { error, status, devices } = await Devices.getAllDevices();
            if (error) {
                return res.status(status).json({ message: error });
            }
            return res.status(200).json({ devices });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async deleteDevice(req, res) {
        try {
            const { id } = req.params;
            const { device, error, status } = await Devices.deleteDevice(id);
            if (error) {
                return res.status(status).json({ message: error });
            }
            return res.status(200).json({ device });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async updateDevice(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const { device, error, status } = await Devices.updateDevice({
                id,
                name,
            });
            if (error) {
                return res.status(status).json({ message: error });
            }
            return res.status(200).json({ device });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }
}

export default new DeviceController();

18;

17;

16;

15;

14;

13;

12;

11;

10;

9;

8;

7;

6;

5;

4;

3;

2;

1;
