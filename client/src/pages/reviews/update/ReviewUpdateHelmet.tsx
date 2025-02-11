import { Helmet } from "react-helmet";

const ReviewUpdateHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Update Review - Tienda B3042</title>
    <meta
      name="description"
      content="Edit and update your review on Tienda B3042 to reflect your latest experience and feedback."
    />
    {/* Typically, review editing pages are not indexed */}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);

export default ReviewUpdateHelmet;
