import { Helmet } from "react-helmet";

const ProductsCategoryHelmet = ({
  categoryName,
}: {
  categoryName?: string;
}) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>
      {categoryName
        ? `${categoryName} - Tienda B3042`
        : "Products by Category - Tienda B3042"}
    </title>
    <meta
      name="description"
      content={
        categoryName
          ? `Browse ${categoryName} products at Tienda B3042. Find the best items in this category and shop now.`
          : "Explore different product categories at Tienda B3042 and discover great deals."
      }
    />
    {/* Allow search engines to index this page */}
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ProductsCategoryHelmet;
