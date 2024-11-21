import nodemailer from "nodemailer";
import { config } from "dotenv";
config();
export const transporter = nodemailer.createTransport(
  {
    host: `${process.env.EMAIL_STMP_SERVER}`,
    port: Number(process.env.EMAIL_SMTP_PORT),
    auth: {
      user: `${process.env.EMAIL_USERNAME}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  },
  { from: `${process.env.EMAIL_DIRECTION}` },
);
