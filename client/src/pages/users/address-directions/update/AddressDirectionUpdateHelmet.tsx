import { Helmet } from "react-helmet";

const AddressUpdateHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Update Address - Tienda B3042</title>
    <meta
      name="description"
      content="Update your saved address on Tienda B3042. Keep your shipping details accurate for seamless order delivery."
    />
    {/* Prevent search engines from indexing this page for privacy reasons */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default AddressUpdateHelmet;
