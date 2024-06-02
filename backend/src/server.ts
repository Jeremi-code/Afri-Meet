import express from "express";
import { env } from "./env";

const app = express();

const PORT = env.EXPRESS_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
