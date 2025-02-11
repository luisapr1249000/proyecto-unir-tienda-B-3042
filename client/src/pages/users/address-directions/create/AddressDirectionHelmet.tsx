import { Helmet } from "react-helmet";

const AddressCreateHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Add Address - Tienda B3042</title>
    <meta
      name="description"
      content="Add a new shipping address to your Tienda B3042 account. Ensure accurate delivery by updating your address details."
    />
    {/* Prevent search engines from indexing this page for privacy reasons */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default AddressCreateHelmet;
