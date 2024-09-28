import { Hono } from "hono";
import { createNewUser, signIn } from "../handlers/user";

const routes = new Hono();
routes.post("/signup", createNewUser);
routes.post("/signin", signIn);

export default routes;
