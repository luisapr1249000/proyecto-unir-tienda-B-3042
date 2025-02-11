import { Helmet } from "react-helmet";

const ForgotPasswordHelmet = () => (
  <Helmet>
    {/* Basic character encoding */}
    <meta charSet="utf-8" />

    {/* Dynamic page title */}
    <title>Forgot Password - Tienda B3042</title>

    {/* Meta description for the forgot password page */}
    <meta
      name="description"
      content="Reset your password for Tienda B3042 to regain access to your account quickly and securely."
    />

    {/* Prevent search engines from indexing the page */}
    <meta name="robots" content="noindex, nofollow" />

    {/* Ensure proper scaling on mobile devices */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ForgotPasswordHelmet;
