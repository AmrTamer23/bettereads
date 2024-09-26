import config from "./config";
import app from "./server";
import * as dotenv from "dotenv";
dotenv.config();

app.listen(config, () => {
  console.log("Server is running on http://localhost:3000");
});
