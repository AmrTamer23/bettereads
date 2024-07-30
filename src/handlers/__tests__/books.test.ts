import request from "supertest";
import app from "../../server";

describe("User Handler", () => {
  it("should return all books", async () => {
    const res = await request(app).get("/api/books");

    expect(res.status).toBe(200);
  });
});
