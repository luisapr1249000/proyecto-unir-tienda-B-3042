import { Helmet } from "react-helmet";

const ProductCreateHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Create Product - Tienda B3042</title>
    <meta
      name="description"
      content="Add a new product to Tienda B3042 and expand your store’s offerings with ease."
    />
    {/* Typically, admin product creation pages should not be indexed */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ProductCreateHelmet;
