import { Helmet } from "react-helmet";

export const SendConfirmationEmailHelmet = () => (
  <Helmet>
    {/* Character encoding */}
    <meta charSet="utf-8" />

    {/* Page title */}
    <title>Confirm Email - Tienda B3042</title>

    {/* Meta description */}
    <meta
      name="description"
      content="Confirm your email address for Tienda B3042 to activate your account and access our exclusive features."
    />

    {/* Instruct search engines not to index this page */}
    <meta name="robots" content="noindex, nofollow" />

    {/* Ensure proper display on mobile devices */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);
