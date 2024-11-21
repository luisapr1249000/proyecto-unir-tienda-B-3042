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
