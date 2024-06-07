import express, { Router } from "express";
import {registerUser,authUser} from "../controller/UserController";

const router: Router = express.Router();

router.post("/signup", registerUser);
router.post("/signin",authUser)

export default router;
