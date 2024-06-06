import express from "express";
import router from "./route/UserRoute";
import { env } from "./env";
import cors from 'cors' 

// console.log(process.env.EXPRESS_PORT)
const app = express();

const PORT = env.EXPRESS_PORT;

app.use(express.json());
app.use(router);
app.use(cors())
app.get('/',(req,res) => {
  res.send('Hello World')
}
)
console.log('za')


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
