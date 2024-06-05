import express, { Router } from 'express'
import registerUser from '../controller/UserController.'
const router : Router = express.Router()

router.post('/signup',registerUser)