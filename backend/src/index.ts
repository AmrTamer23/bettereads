import { serve } from "@hono/node-server";
import { Hono } from "hono";
import routes from "./routes";
// Use the imported routes

export const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!!!!!@@");
});

app.route("/", routes);

const port = 3005;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,

  port,
});
