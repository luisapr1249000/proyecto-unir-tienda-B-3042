import { Helmet } from "react-helmet";

const CreateCategoryHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Create Category - Tienda B3042</title>
    <meta
      name="description"
      content="Use this page to create a new category on Tienda B3042. Organize your products efficiently and enhance user navigation."
    />
    {/* Typically, administrative pages are not indexed */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default CreateCategoryHelmet;
