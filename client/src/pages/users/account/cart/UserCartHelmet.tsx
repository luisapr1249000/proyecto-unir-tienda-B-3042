import { Helmet } from "react-helmet";

const UserCartHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Shopping Cart - Tienda B3042</title>
    <meta
      name="description"
      content="View and manage your shopping cart at Tienda B3042. Add, remove, or update items before proceeding to checkout."
    />
    {/* Typically, shopping cart pages should not be indexed */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default UserCartHelmet;
