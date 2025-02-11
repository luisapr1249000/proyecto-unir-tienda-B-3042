import { Helmet } from "react-helmet";

const ProductUpdateHelmet = ({ productName }: { productName: string }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>
      {productName
        ? `Update ${productName} - Tienda B3042`
        : "Update Product - Tienda B3042"}
    </title>
    <meta
      name="description"
      content={
        productName
          ? `Update the details of ${productName} on Tienda B3042 to ensure accurate information and improve visibility.`
          : "Modify product details at Tienda B3042 to keep your store up to date."
      }
    />
    {/* Typically, admin update pages should not be indexed */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ProductUpdateHelmet;
