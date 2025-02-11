import { Helmet } from "react-helmet";

const ReviewCreateHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Create Review - Tienda B3042</title>
    <meta
      name="description"
      content="Share your feedback by creating a new review on Tienda B3042. Help others make informed decisions with your experience."
    />
    {/* Typically, review submission pages are not indexed */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ReviewCreateHelmet;
