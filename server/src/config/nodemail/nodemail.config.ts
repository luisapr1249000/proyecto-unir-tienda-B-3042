import nodemailer from "nodemailer";
import { env } from "../envConfig";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const nodeMailOptions: SMTPTransport.Options = {
  host: env.EMAIL_SMTP_HOST,
  port: Number(env.EMAIL_SMTP_PORT),
  secure: false,
  auth: {
    user: env.EMAIL_USERNAME,
    pass: env.EMAIL_PASSWORD,
  },
  from: env.EMAIL_USERNAME,
};

export const transporter = nodemailer.createTransport(nodeMailOptions);
