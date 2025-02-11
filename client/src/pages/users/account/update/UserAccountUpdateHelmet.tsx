import { Helmet } from "react-helmet";

const UserAccountUpdateHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Update Account - Tienda B3042</title>
    <meta
      name="description"
      content="Update your personal details and account settings on Tienda B3042 to keep your information up-to-date."
    />
    {/* Prevent search engines from indexing this page for privacy reasons */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default UserAccountUpdateHelmet;
