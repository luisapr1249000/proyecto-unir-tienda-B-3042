import Grid from "@mui/material/Grid2";
import { ProductProp } from "../../../../types/product";
import {
  Card,
  CardContent,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { GridBorderRadious } from "../../../../assets/css/mui-css-objects/grid";

const ProductSpecificationCard = ({
  specification,
  label,
}: {
  specification: string;
  label: string;
}) => {
  const isMeter = ["Width", "Depth", "Height"].includes(label);
  return (
    <TextField
      name={label}
      label={label}
      placeholder="Specification"
      value={specification}
      fullWidth
      // disabled
      variant="standard"
      slotProps={{
        inputLabel: { shrink: true },
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              {isMeter ? "CM" : ""}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

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
    <Card
      component={Grid}
      spacing={3}
      elevation={4}
      size={{ xs: 11 }}
      sx={{ ...GridBorderRadious }}
    >
      <CardContent sx={{ bgcolor: "action.hover" }}>
        <Typography variant="h6" color="textSecondary">
          Specifications
        </Typography>
      </CardContent>
      <Divider />
      <CardContent
        component={Grid}
        container
        spacing={3}
        size={{ xs: 12 }}
        sx={{ justifyContent: "space-evenly" }}
      >
        <Card elevation={5} component={Grid} size={{ xs: 12, md: 4 }}>
          <CardContent sx={{ bgcolor: "action.hover" }}>
            <Typography variant="caption" color="textSecondary">
              Dimensions
            </Typography>
          </CardContent>
          <Divider />
          <CardContent component={Grid} container spacing={3}>
            {firstSpecificationList.map((specification, index) => (
              <ProductSpecificationCard
                key={index}
                specification={String(specification.value)}
                label={specification.label}
              />
            ))}
          </CardContent>
        </Card>

        <Card elevation={5} component={Grid} size={{ xs: 12, md: 4 }}>
          <CardContent sx={{ bgcolor: "action.hover" }}>
            <Typography variant="caption" color="textSecondary">
              Other
            </Typography>
          </CardContent>
          <Divider />
          <CardContent component={Grid} container spacing={3}>
            {secondSpecificationList.map((specification, index) => (
              <ProductSpecificationCard
                key={index}
                specification={String(specification.value)}
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
