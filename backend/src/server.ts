import express from "express";
import userRouter from "./route/UserRoute";
import emailRouter from "./route/EmailRoute"
import { env } from "./env";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const PORT = env.EXPRESS_PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(userRouter);
app.use(emailRouter);
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
