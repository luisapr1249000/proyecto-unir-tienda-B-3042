import { Helmet } from "react-helmet";

const UserAccountOverviewHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>My Account - Tienda B3042</title>
    <meta
      name="description"
      content="Manage your Tienda B3042 account. View your orders, update your profile, and manage your account settings."
    />
    {/* Typically, user account pages should not be indexed for privacy reasons */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default UserAccountOverviewHelmet;
