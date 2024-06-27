import express, { Router } from "express";
import { registerUser, authUser } from "../controller/UserController";

const userRouter: Router = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/signin", authUser)

export default userRouter;
