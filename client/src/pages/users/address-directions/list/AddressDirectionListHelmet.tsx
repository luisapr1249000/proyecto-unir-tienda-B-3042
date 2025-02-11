import { Helmet } from "react-helmet";

const AddressListHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>My Addresses - Tienda B3042</title>
    <meta
      name="description"
      content="Manage your saved addresses on Tienda B3042. Add, update, or remove your shipping addresses for faster checkout."
    />
    {/* Prevent search engines from indexing this page for privacy reasons */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default AddressListHelmet;
