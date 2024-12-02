import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productInputSchema } from "../../../validation-schemas/product-schemas/product.validation";
import {
  Card,
  Divider,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  ProductInput,
  ProductProp,
  ProductUpdateInput,
} from "../../../types/product";
import ProductAddCategories from "../product-create/ProductAddCategory";
import ProductAddImagen from "../product-create/ProductAddImagen";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";

const ProductUpdateForm = ({ product }: ProductProp) => {
  const [categoriesId, setCategoriesId] = useState(
    product.categories.map((category) => category._id)
  );
  const [categoriesName, setCategoriesName] = useState(
    product.categories.map((category) => category.name)
  );
  //   const categoriesName = ;
  const initialValues = {
    name: product.name,
    description: product.description,
    categories: categoriesId,
    price: product.price,
    quantity: product.quantity,
    images: product.images,
    specifications: {
      dimensions: {
        width: product.specifications?.dimensions?.width,
        depth: product.specifications?.dimensions?.depth,
        height: product.specifications?.dimensions?.height,
      },
      material: product.specifications?.material,
      finish: product.specifications?.finish,
      assemblyRequired: product.specifications?.assemblyRequired,
      weightCapacity: product.specifications?.weightCapacity,
    },
    discount: product.discount,
  };

  const formik = useFormik<ProductInput>({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(productInputSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(formik.values.categories);
  return (
    <Grid container spacing={4} component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          name="name"
          label="Name"
          placeholder="Product Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={
            formik.touched.name && Boolean(formik.errors.name)
              ? formik.errors.name
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.name && Boolean(!formik.errors.name)
              ? true
              : undefined
          }
          color={
            formik.touched.name && Boolean(!formik.errors.name)
              ? "success"
              : undefined
          }
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          required
          name="description"
          label="Description"
          placeholder="Product Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={
            formik.touched.description && Boolean(formik.errors.description)
              ? formik.errors.description
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.description && Boolean(!formik.errors.description)
              ? true
              : undefined
          }
          color={
            formik.touched.description && Boolean(!formik.errors.description)
              ? "success"
              : undefined
          }
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          required
          name="price"
          label="Price"
          placeholder="Product Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={
            formik.touched.price && Boolean(formik.errors.price)
              ? formik.errors.price
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          focused={
            formik.touched.price && Boolean(!formik.errors.price)
              ? true
              : undefined
          }
          color={
            formik.touched.price && Boolean(!formik.errors.price)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          name="discount"
          label="discount"
          placeholder="Product discount"
          type="number"
          value={formik.values.discount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.discount && Boolean(formik.errors.discount)}
          helperText={
            formik.touched.discount && Boolean(formik.errors.discount)
              ? formik.errors.discount
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          required
          name="quantity"
          label="Quantity"
          placeholder="Product Quantity"
          type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={
            formik.touched.quantity && Boolean(formik.errors.quantity)
              ? formik.errors.quantity
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.quantity && Boolean(!formik.errors.quantity)
              ? true
              : undefined
          }
          color={
            formik.touched.quantity && Boolean(!formik.errors.quantity)
              ? "success"
              : undefined
          }
        />
      </Grid>

      <ProductAddCategories categoryNameList={categoriesName} formik={formik} />
      <ProductAddImagen />

      <Divider sx={{ width: 1 }}>
        <Typography color="textSecondary" variant="caption">
          Optional Fields
        </Typography>
      </Divider>
      <Grid
        container
        size={{ xs: 12 }}
        sx={{ justifyContent: "space-around", alignItems: "center" }}
      >
        <Grid
          container
          component={Card}
          sx={{ p: 3 }}
          variant="outlined"
          size={{ xs: 6 }}
        >
          <Grid>
            <Typography variant="body2" color="textSecondary">
              Dimensions
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              name="specifications.dimensions.width"
              label="Width"
              placeholder="Width (cm)"
              value={formik.values.specifications?.dimensions?.width}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={
                formik.touched.specifications?.dimensions?.width &&
                Boolean(formik.errors.specifications?.dimensions?.width)
              }
              helperText={
                formik.touched.specifications?.dimensions.width &&
                formik.errors.specifications?.dimensions?.width
              }
              slotProps={{
                inputLabel: { shrink: true },
              }}
              focused={
                formik.touched.specifications?.dimensions?.width &&
                Boolean(!formik.errors.specifications?.dimensions?.width)
                  ? true
                  : undefined
              }
              color={
                formik.touched.specifications?.dimensions?.width &&
                Boolean(!formik.errors.specifications?.dimensions?.width)
                  ? "success"
                  : undefined
              }
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="specifications.dimensions.depth"
              label="Depth"
              placeholder="Depth (cm)"
              value={formik.values.specifications?.dimensions?.depth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="specifications.dimensions.height"
              label="Height"
              placeholder="Height (cm)"
              value={formik.values.specifications?.dimensions?.height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 6 }}
          container
          component={Card}
          sx={{ p: 3 }}
          variant="outlined"
        >
          <Grid>
            <Typography variant="body2" color="textSecondary">
              Other Specifications
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="specifications.material"
              label="Material"
              placeholder="Material"
              value={formik.values.specifications?.material}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              name="specifications.finish"
              label="Finish"
              placeholder="Finish"
              value={formik.values.specifications?.finish}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              name="specifications.weightCapacity"
              label="Weight Capacity"
              placeholder="Weight Capacity (kg)"
              type="number"
              value={formik.values.specifications?.weightCapacity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <SubmitButton fullWidth isValid={formik.isValid} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductUpdateForm;