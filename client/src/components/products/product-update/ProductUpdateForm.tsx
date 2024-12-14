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
import GridDivider from "../../common/grid-divider/GridDivider";
import ProductSpecificationsForm from "../product-create/ProductSpecificationsForm";
import { useGetCategoriesWitPagination } from "../../../hooks/category";

const ProductUpdateForm = ({ product }: ProductProp) => {
  const { data: categories, isLoading } = useGetCategoriesWitPagination({
    page: 1,
    limit: 50,
  });

  const [categoriesName, setCategoriesName] = useState(
    product.categories.map((category) => category.name)
  );
  const handleSetCategories = (categories: string[]) => {
    formik.setFieldValue("categories", categories);
  };
  const initialValues = {
    name: product.name,
    description: product.description,
    categories: categoriesName,
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

  const formik = useFormik<ProductUpdateInput>({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(productInputSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  if (!categories) return <Typography>Categories not load</Typography>;

  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
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

      <ProductAddCategories
        categoryNameList={product?.categories.map((category) => category.name)}
        categories={categories}
        handleSetCategories={handleSetCategories}
      />
      <GridDivider>
        <Typography color="textSecondary" variant="caption">
          Attach Images
        </Typography>
      </GridDivider>
      <ProductAddImagen isSuccessSubmit={false} />
      <GridDivider>
        <Typography color="textSecondary" variant="caption">
          Optional Fields
        </Typography>
      </GridDivider>
      <ProductSpecificationsForm formik={formik} />
    </Grid>
  );
};

export default ProductUpdateForm;
