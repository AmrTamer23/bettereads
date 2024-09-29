import { Hono } from "hono";
import { approveBook, rejectBook } from "../handlers/admin";

const routes = new Hono();
routes.post("/approve", approveBook);
routes.post("/reject", rejectBook);

export default routes;
