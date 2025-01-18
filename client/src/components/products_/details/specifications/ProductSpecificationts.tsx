import React from "react";
import Grid from "@mui/material/Grid2";
import { ProductProp } from "../../../../types/product";
import {
  Card,
  CardContent,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { isEmptyString } from "../../../../utils/utils";

const ProductSpecificationCard = ({
  specification,
  label,
}: {
  specification: string;
  label: string;
}) => (
  <TextField
    name={label}
    label={label}
    placeholder="Specification"
    value={specification}
    fullWidth
    disabled
    variant="standard"
    slotProps={{ inputLabel: { shrink: true }, input: { readOnly: true } }}
  />
);

const ProductSpecificationts = ({ product }: ProductProp) => {
  const firstSpecificationList = [
    {
      label: "Width",
      value: product.specifications?.dimensions?.width,
    },
    {
      label: "Depth",
      value: product.specifications?.dimensions?.depth,
    },
    {
      label: "Height",
      value: product.specifications?.dimensions?.height,
    },
  ];

  const secondSpecificationList = [
    {
      label: "Material",
      value: product.specifications?.material,
    },
    {
      label: "Finish",
      value: product.specifications?.finish,
    },
    {
      label: "Assembly Required",
      value: product.specifications?.assemblyRequired ? "Yes" : "No",
    },
    {
      label: "Weight Capacity",
      value: product.specifications?.weightCapacity,
    },
  ];

  console.log(secondSpecificationList);

  return (
    <Card variant="outlined" component={Grid} spacing={3} size={{ xs: 11 }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Specifications
        </Typography>
      </CardContent>
      <Divider />
      <CardContent
        component={Grid}
        container
        size={{ xs: 12 }}
        sx={{ justifyContent: "space-evenly", bgcolor: "action.hover" }}
      >
        <Card variant="outlined" component={Grid} size={{ xs: 4 }}>
          <CardContent>
            <Typography variant="caption" color="textSecondary">
              Dimensions
            </Typography>
          </CardContent>
          <Divider />
          <CardContent component={Grid} container spacing={3}>
            {firstSpecificationList.map((specification, index) => (
              <ProductSpecificationCard
                key={index}
                specification={isEmptyString(
                  String(specification.value ?? "N/A")
                )}
                label={specification.label}
              />
            ))}
          </CardContent>
        </Card>

        <Card variant="outlined" component={Grid} size={{ xs: 4 }}>
          <CardContent>
            <Typography variant="caption" color="textSecondary">
              Other
            </Typography>
          </CardContent>
          <Divider />
          <CardContent component={Grid} container spacing={3}>
            {secondSpecificationList.map((specification, index) => (
              <ProductSpecificationCard
                key={index}
                specification={isEmptyString(
                  String(specification.value ?? "N/A")
                )}
                label={specification.label}
              />
            ))}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ProductSpecificationts;
