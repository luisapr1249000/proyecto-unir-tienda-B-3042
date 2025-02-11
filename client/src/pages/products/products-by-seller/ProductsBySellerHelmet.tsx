import { Helmet } from "react-helmet";

const ProductsBySellerHelmet = ({ sellerName }: { sellerName?: string }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>
      {sellerName
        ? `${sellerName}'s Products - Tienda B3042`
        : "Seller Products - Tienda B3042"}
    </title>
    <meta
      name="description"
      content={
        sellerName
          ? `Browse products from ${sellerName} at Tienda B3042. Find great deals and quality items from this seller.`
          : "Explore products from various sellers at Tienda B3042 and discover great deals."
      }
    />
    {/* Allow search engines to index this page */}
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ProductsBySellerHelmet;
