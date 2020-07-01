import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cron from "node-cron";
import fetch from "node-fetch";
import sequelize from "../db/connection";

import injectToken from "./injectToken";

import accessEnv from "#root/helpers/accessEnv";

import setupRoutes from "./routes";

const PORT = accessEnv("PORT", 7101);

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
      "X-Password-Expired",
    ],
    optionsSuccessStatus: 200,
  })
);

app.use((err, req, res, next) =>
  res.status(500).json({
    message: err.message,
  })
);

// Only apply the token to calls to careplanner
app.use("/fetch-all-appointments", injectToken);

setupRoutes(app);

cron.schedule("*/20 * * * *", async () => {
  await sequelize.query(`TRUNCATE TABLE appointments`);
  console.log("Appointments table truncated...");
  // TODO: Update hardcoded URL for other ENVs
  // Hit endpoint that get's all appointments for the next 5 weeks
  await fetch("http://localhost:7101/fetch-all-appointments");
});

app.listen(PORT, "0.0.0.0", () => {
  console.info(`Operations service listening on ${PORT}`);
});
