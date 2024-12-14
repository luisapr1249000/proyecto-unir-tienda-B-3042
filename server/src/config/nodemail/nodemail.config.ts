import nodemailer from "nodemailer";
import { env } from "../envConfig";

export const transporter = nodemailer.createTransport(
  {
    host: `${env.EMAIL_STMP_HOST}`,
    port: Number(env.EMAIL_SMTP_PORT),
    auth: {
      user: `${env.EMAIL_USERNAME}`,
      pass: `${env.EMAIL_PASSWORD}`,
    },
  },
  { from: `${env.EMAIL_USERNAME}` },
);
