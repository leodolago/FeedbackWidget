import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "734c2c9e2e2198",
      pass: "f3b207b03ceea7"
    }
  });

export class NodemailerAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {

        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Leonardo Lago <leodolago@gmail.com',
            subject: subject,
            html: body,
        });
    };
}