import { Helmet } from "react-helmet";

const GlobalHelmet = ({ title, description }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title ? `${title} - Tienda B3042` : "Tienda B3042"}</title>
    <meta
      name="description"
      content={
        description ||
        "Shop the best products at Tienda B3042. Find great deals, top brands, and exclusive offers."
      }
    />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default GlobalHelmet;
