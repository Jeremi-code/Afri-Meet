import nodemailer from 'nodemailer'
import { env } from '../env';
console.log(env.NODEMAILER_EMAIL)
let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: env.NODEMAILER_EMAIL,
      pass: env.NODEMAILER_PASSWORD 
    }
  });

export default transporter