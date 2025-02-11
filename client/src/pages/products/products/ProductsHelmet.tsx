import { Helmet } from "react-helmet";

const ProductsHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Products - Tienda B3042</title>
    <meta
      name="description"
      content="Explore a wide range of products at Tienda B3042. Find the best deals and shop your favorite items now."
    />
    {/* Allow search engines to index this page */}
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ProductsHelmet;
