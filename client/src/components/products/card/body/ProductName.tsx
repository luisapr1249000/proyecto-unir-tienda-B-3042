import { Typography } from "@mui/material";
const ProductName = ({ name }: { name: string }) => (
  <Typography
    component="div"
    sx={{ textTransform: "capitalize", mt: 0.5 }}
    gutterBottom
    variant="body2"
  >
    {name}
  </Typography>
);

export default ProductName;
