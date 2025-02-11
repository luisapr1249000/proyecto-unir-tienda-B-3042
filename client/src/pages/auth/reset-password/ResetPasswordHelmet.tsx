import { Helmet } from "react-helmet";

const ResetPasswordHelmet = () => (
  <Helmet>
    {/* Basic character encoding */}
    <meta charSet="utf-8" />

    {/* Dynamic page title */}
    <title>Reset Password - Tienda B3042</title>

    {/* Meta description for the reset password page */}
    <meta
      name="description"
      content="Reset your password for Tienda B3042 to secure your account and continue enjoying our services."
    />

    {/* Prevent search engines from indexing the page */}
    <meta name="robots" content="noindex, nofollow" />

    {/* Ensure proper scaling on mobile devices */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);
export default ResetPasswordHelmet;
