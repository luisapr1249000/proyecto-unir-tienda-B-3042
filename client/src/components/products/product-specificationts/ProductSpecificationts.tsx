import React from "react";
import Grid from "@mui/material/Grid2";
import { ProductProp } from "../../../types/product";
import {
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

const ProductSpecificationts = ({ product }: ProductProp) => {
  const productDimentions = [
    { label: "Height", value: product.specifications?.dimensions?.height },
    { label: "Width", value: product.specifications?.dimensions?.width },
    { label: "Depth", value: product.specifications?.dimensions?.depth },
  ];

  const productOtherProps = [
    { label: "Material ", value: product.specifications?.material },
    { label: "Weight Capacity", value: product.specifications?.weightCapacity },
    {
      label: "Assembly Required",
      value: product.specifications?.assemblyRequired,
    },
    { label: "Required finish ", value: product.specifications?.finish },
  ];

  return (
    <Card
      variant="outlined"
      component={Grid}
      direction="column"
      container
      sx={{ boxShadow: 1, borderRadius: 2 }}
      size={{ xs: 11 }}
    >
      <CardContent>
        <Typography color="textSecondary">Product Specifications</Typography>
      </CardContent>
      <Divider />
      <CardContent
        component={Grid}
        container
        spacing={{ xs: 3, md: 0 }}
        sx={{ justifyContent: "space-evenly", bgcolor: "#eee" }}
      >
        <Card
          sx={{ boxShadow: 1, borderRadius: 2 }}
          component={Grid}
          container
          direction="column"
          size={{ xs: 12, md: 5 }}
          variant="outlined"
        >
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Product Dimensions
            </Typography>
          </CardContent>
          <Divider />
          <CardContent component={Grid} container spacing={2}>
            {productDimentions.map((product) => (
              <TextField
                variant="standard"
                fullWidth
                key={product.label}
                value={product.value}
                label={product.label}
                size="small"
                slotProps={{ input: { readOnly: true, sx: { fontSize: 14 } } }}
              />
            ))}
          </CardContent>
        </Card>
        <Card
          component={Grid}
          container
          direction="column"
          sx={{ boxShadow: 1, borderRadius: 2 }}
          size={{ xs: 12, md: 5 }}
          variant="outlined"
        >
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Product's Other Specifications
            </Typography>
          </CardContent>
          <Divider />
          <CardContent component={Grid} container spacing={2}>
            {productOtherProps.map((product) => (
              <TextField
                variant="standard"
                fullWidth
                key={product.label}
                value={product.value}
                label={product.label}
                size="small"
                slotProps={{ input: { readOnly: true, sx: { fontSize: 14 } } }}
              />
            ))}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ProductSpecificationts;
