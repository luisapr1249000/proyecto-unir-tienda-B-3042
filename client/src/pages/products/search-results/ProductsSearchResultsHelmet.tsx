import { Helmet } from "react-helmet";

const ProductsSearchResultsHelmet = ({
  searchQuery,
}: {
  searchQuery?: string;
}) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>
      {searchQuery
        ? `Search Results for "${searchQuery}" - Tienda B3042`
        : "Search Products - Tienda B3042"}
    </title>
    <meta
      name="description"
      content={
        searchQuery
          ? `Find products related to "${searchQuery}" at Tienda B3042. Browse through our catalog and discover the best deals.`
          : "Search for products at Tienda B3042 and explore a wide range of items to suit your needs."
      }
    />
    {/* Allow search engines to index search results */}
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ProductsSearchResultsHelmet;
