import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./src/router.js";
import { createPool } from "./src/services/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = createPool();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use((req, res, next) => {
  req.db = pool;
  next();
});

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swaggerConfig.js";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", router);

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
