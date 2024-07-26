import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const stage = process.env.STAGE || "dev";

let envConfig;

if (stage === "prod") {
  envConfig = require("./prod").config;
} else if (stage === "tst") {
  envConfig = require("./tst").config;
} else {
  envConfig = require("./dev").config;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 6109,
    secerts: {
      jwt: process.env.JWT_SECRET,
      db_url: process.env.DATABASE_URL,
      db_dir_url: process.env.DIRECT_URL,
    },
  },
  envConfig
);
