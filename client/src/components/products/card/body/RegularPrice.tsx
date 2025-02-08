import Typography from "@mui/material/Typography";
const RegularPrice = ({ price }: { price: number }) => (
  <Typography
    component="div"
    sx={{ fontWeight: "bold" }}
    gutterBottom
    variant="h6"
  >
    $ {price}
  </Typography>
);

export default RegularPrice;
