import Brands from "../../models/Brands.js";

class BrandsController {
    async getAllBrands(req, res) {
        try {
            const { error, status, brands } = await Brands.getAllBrands();
            if (error) {
                return res.status(status).json({ message: error });
            }
            return res.status(200).json({ brands });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async getOneBrandById(req, res) {
        try {
            const { id } = req.params;
            const { brand, error, status } = await Brands.getOneBrandById(id);
            if (error) {
                return res.status(status).json({ message: error });
            }
            return res.status(200).json({ brand });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async createBrands(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res
                    .status(400)
                    .json({ message: "Не задано название бренда" });
            }
            const { brand, error, status } = await Brands.createBrands({
                name,
            });
            if (error) {
                return res.status(status).json({ message: error });
            }
            return res.status(201).json({ brand });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async deleteBrands(req, res) {
        try {
            const { id } = req.params;
            const { brand, error, status } = await Brands.deleteBrands(id);
            if (error) {
                return res.status(status).json({ message: error });
            }
            return res.status(200).json({ brand });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async updateBrands(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            if (!name) {
                return res
                    .status(400)
                    .json({ message: "Не задано название бренда" });
            }
            const {
                newBrand: brand,
                error,
                status,
            } = await Brands.updateBrands({ id, name });

            if (error) {
                return res.status(status).json({ message: error });
            }
            return res.status(200).json({ brand });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }
}

export default new BrandsController();
