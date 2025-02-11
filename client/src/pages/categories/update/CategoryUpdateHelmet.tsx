import { Helmet } from "react-helmet";

const CategoryUpdateHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Update Category - Tienda B3042</title>
    <meta
      name="description"
      content="Edit and update an existing category in Tienda B3042 to keep your product organization up to date."
    />
    {/* Typically, admin pages should not be indexed */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default CategoryUpdateHelmet;
