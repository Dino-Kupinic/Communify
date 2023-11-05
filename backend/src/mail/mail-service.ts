import nodemailer, {Transporter} from "nodemailer"
import {MailOptions} from "nodemailer/lib/sendmail-transport"

/**
 * A transporter object that is used to send emails using the nodemailer library.
 */
const transport: Transporter = nodemailer.createTransport({
  host: "smtp.gmx.net",
  port: 587,
  secure: false,
  auth: {
    user: "service.communify@gmx.at",
    pass: "Communifyservice2023!",
  },
})

export class EmailService {
  /**
   * Sends an email using the provided mailOptions.
   *
   * @param {MailOptions} mailOptions - The options for sending the email.
   * @return {Promise<void>} - A promise that resolves when the email is sent successfully or rejects with an error.
   */
  async sendMail(mailOptions: MailOptions): Promise<void> {
    try {
      await transport.sendMail(mailOptions)
    } catch (err) {
      console.error(err)
    }
  }
}
