import { Helmet } from "react-helmet";

const ProductDetailsHelmet = ({
  productName,
  productDescription,
}: {
  productName?: string;
  productDescription?: string;
}) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>
      {productName
        ? `${productName} - Tienda B3042`
        : "Product Details - Tienda B3042"}
    </title>
    <meta
      name="description"
      content={
        productDescription ||
        "View product details on Tienda B3042 and explore its features, reviews, and specifications."
      }
    />
    {/* Allow search engines to index this page */}
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ProductDetailsHelmet;
