import Handlebars from "handlebars";
import fs from "fs";

export const generateConfirmEmailHtmlTemplate = (
  username: string,
  link: string,
) => {
  const templateSource = fs
    .readFileSync("./src/templates/nodemailer/confirmEmail.html", "utf8")
    .trim();
  const template = Handlebars.compile(templateSource);
  const data = { username, link };
  const emaiHtml = template(data);
  console.log(emaiHtml);
  return emaiHtml;
};

export const generatePasswordResetHtmlTemplate = (
  username: string,
  link: string,
) => {
  const templateSource = fs.readFileSync(
    "./src/templates/nodemailer/resetPassword.html",
  );
  const template = Handlebars.compile(templateSource);
  const data = { username, link };
  const emaiHtml = template(data);
  return emaiHtml;
};

export const createNodemailMessage = (
  to: string,
  subject: string,
  messageInHtml: string,
) => {
  return {
    to: to,
    subject: subject,
    html: messageInHtml,
  };
};
