import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productInputSchema } from "../../../validation-schemas/product-schemas/product.validation";
import { InputAdornment, TextField, Typography } from "@mui/material";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import ProductAddCategories from "./ProductAddCategory";
import { useGetCategoriesWitPagination } from "../../../hooks/category";
import GridDivider from "../../common/grid-divider/GridDivider";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../../api/product.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductAddImagen from "./ProductAddImagen";
import ProductSpecificationsForm from "./ProductSpecificationsForm";

const ProductCreateForm = () => {
  const navigate = useNavigate();
  const { mutate: createProductMutation, isSuccess: isSuccessCreateProduct } =
    useMutation({
      mutationFn: createProduct,
      onSuccess: (data) => {
        console.log("data: ", data);
        navigate("/products");
      },
      onError: (error) => {
        console.log("error: ", error);
        toast.error(error.message);
      },
    });

  const { data: categories } = useGetCategoriesWitPagination({
    page: 1,
    limit: 50,
  });

  const initialValues = {
    name: "",
    description: "",
    categories: [],
    price: 0,
    quantity: 0,
    specifications: {
      dimensions: {
        width: 0,
        depth: 0,
        height: 0,
      },
      material: "",
      finish: "",
      assemblyRequired: false,
      weightCapacity: 0,
    },
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(productInputSchema),
    onSubmit: (values) => createProductMutation(values),
  });

  const handleSetCategories = (categories: string[]) => {
    formik.setFieldValue("categories", categories);
  };
  if (!categories) return <Typography>Categories not load</Typography>;

  console.log("formik.values: ", formik.values);
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
        categories={categories}
        handleSetCategories={handleSetCategories}
      />
      <GridDivider>
        <Typography color="textSecondary" variant="caption">
          Attach Images
        </Typography>
      </GridDivider>
      <ProductAddImagen isSuccessSubmit={isSuccessCreateProduct} />
      <GridDivider>
        <Typography color="textSecondary" variant="caption">
          Optional Fields
        </Typography>
      </GridDivider>
      <ProductSpecificationsForm formik={formik} />
      <Grid size={{ xs: 12 }}>
        <SubmitButton fullWidth isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default ProductCreateForm;
