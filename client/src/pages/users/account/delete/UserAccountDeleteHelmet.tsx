import React from "react";
import { Helmet } from "react-helmet";

const UserAccountDeleteHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Delete Account - Tienda B3042</title>
    <meta
      name="description"
      content="Permanently delete your Tienda B3042 account. This action cannot be undone."
    />
    {/* Prevent search engines from indexing this page for security reasons */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);
export default UserAccountDeleteHelmet;
