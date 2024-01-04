import {asyncHandler} from "../middleware/error-handler"
import express, {Router} from "express"
import {EmailService} from "./mail-service"
import {MailOptions} from "nodemailer/lib/sendmail-transport"

export const mailRouter: Router = express.Router()
const mailService: EmailService = new EmailService()

mailRouter.post("/sendEmail", asyncHandler(async (req, res) => {
  const {to, subject, text} = req.body
  const mailOptions: MailOptions = {
    from: "service.communify@gmx.at",
    to: to,
    subject: subject,
    text: text,
  }
  await mailService.sendMail(mailOptions)
  res.send(`Email sent to ${to} succesfully.`)
}))

