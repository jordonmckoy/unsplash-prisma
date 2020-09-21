import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes";

const app = express();
const port = 8000;

app.use(helmet());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
