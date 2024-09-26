import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";
import config from "./config";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  "/api",
  (req, res, next) =>
    config.stage !== "tst" ? protect(req, res, next) : next(),
  router
);
app.post("/login", signIn);
app.post("/register", createNewUser);

export default app;
