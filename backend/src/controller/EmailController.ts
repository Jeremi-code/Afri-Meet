import { Request, Response } from "express"
import transporter from "../utils/transporter"
const emailController = async (req: Request, res: Response) => {
    try {
        const { to, title, date, start_time, end_time } = req.body.input.obj
        const mailOptions = {
            from: "Ermias Sintayehu Deresse",
            to: to,
            subject: "Dear Sir/Madam",
            html: `<p>Hello , The ${title} session you are going to participate will be on <strong>${date}</strong> from <strong>${start_time}</strong> to <strong>${end_time}</strong>`
        }
        transporter.sendMail(mailOptions)
        res.status(200).json({ to: to })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error sending emails', error })
    }
}

export default emailController