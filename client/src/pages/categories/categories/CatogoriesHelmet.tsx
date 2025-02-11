import { Helmet } from "react-helmet";

const CategoriesHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Categories - Tienda B3042</title>
    <meta
      name="description"
      content="Browse through various categories at Tienda B3042 to discover our wide range of products and services."
    />
    {/* Allow search engines to index this page */}
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default CategoriesHelmet;
