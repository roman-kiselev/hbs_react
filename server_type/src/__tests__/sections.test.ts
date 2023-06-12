import request from "supertest";
import app from "../index";

describe("Sections", () => {
    it("should create sections", async () => {
        const response = await request(app).post("/section/1").send({
            value: "Test section",
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("value", "Test section");
    });
});
