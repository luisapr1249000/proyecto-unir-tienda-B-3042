import { Helmet } from "react-helmet";

const ChangePasswordHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Change Password - Tienda B3042</title>
    <meta
      name="description"
      content="Secure your account by changing your password on Tienda B3042. Ensure your account remains protected at all times."
    />
    {/* Prevent search engines from indexing the page for security reasons */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ChangePasswordHelmet;
