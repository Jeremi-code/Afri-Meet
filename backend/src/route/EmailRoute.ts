import express from 'express'
import emailController from "../controller/EmailController";

const emailRouter = express.Router()

emailRouter.post('/sendEmail',emailController)

export default emailRouter