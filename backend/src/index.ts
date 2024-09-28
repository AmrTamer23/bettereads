import { serve } from "@hono/node-server";
import { Hono } from "hono";
import protectedRoutes from "./protected-routes";
import publicRoutes from "./public-routes";
import { protect } from "../modules/auth";

export const app = new Hono();

app.route("/auth", publicRoutes);

app.use("/*", protect);
app.route("/", protectedRoutes);

const port = 3005;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
