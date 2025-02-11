import { Helmet } from "react-helmet";

const UserWishlistHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>My Wishlist - Tienda B3042</title>
    <meta
      name="description"
      content="View and manage your wishlist on Tienda B3042. Save your favorite products for future purchases."
    />
    {/* Prevent search engines from indexing this page for privacy reasons */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default UserWishlistHelmet;
