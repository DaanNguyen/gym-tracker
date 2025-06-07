import express, { Express } from "express";
import { router } from "./routes";
import cors from "cors";
import { config } from "dotenv";

config();

const app: Express = express();

app.use(cors({
  credentials: true,
  origin(requestOrigin, callback) {
    callback(null, requestOrigin);
  }
}));

app.use("/", router);

const port: number = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});