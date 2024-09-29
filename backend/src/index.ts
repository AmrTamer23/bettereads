import { serve } from "@hono/node-server";
import { Hono } from "hono";
import userRoutes from "./user-routes";
import publicRoutes from "./public-routes";
import adminRoutes from "./admin-routes";
import { protect } from "../middleware/auth";
import { protectAdmin } from "../middleware/authorize";

export const app = new Hono();

app.route("/auth", publicRoutes);

app.use("/*", protect);
app.route("/", userRoutes);

app.use("/admin/*", protectAdmin);
app.route("/admin/", adminRoutes);

const port = Number(process.env.PORT) || 3005;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
