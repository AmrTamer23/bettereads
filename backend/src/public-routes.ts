import { Hono } from "hono";
import { createNewUser, signIn, signOut } from "../handlers/user";

const routes = new Hono();
routes.post("/signup", createNewUser);
routes.post("/signin", signIn);
routes.post("/signout", signOut);

export default routes;
