import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productInputSchema } from "../../../validation-schemas/product-schemas/product.validation";
import Grid from "@mui/material/Grid2";
import TextField from "../../common/textfields/TextField";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { Divider, MenuItem, Typography } from "@mui/material";
import { ProductProp } from "../../../types/product";
// import { useGetCategoriesWithPagination } from "../../../hooks/categories.hooks";
import ProductCategoriesForm from "../create/ProductCategoriesForm";
import ProductUpdateAttachedImages from "./ProductUpdateAttachedImages";

const ProductUpdateForm = ({ product }: ProductProp) => {
  // const { data: categories } = useGetCategoriesWithPagination({ limit: 50 });
  const initialValues = {
    name: product.name,
    description: product.description,
    categories: [],
    price: product.price,
    quantity: product.quantity,
    specifications: {
      dimensions: {
        height: product.specifications?.dimensions?.height,
        depth: product.specifications?.dimensions?.depth,
        width: product.specifications?.dimensions?.width,
      },
      material: product.specifications?.material,
      finish: product.specifications?.finish,
      assemblyRequired: product.specifications?.assemblyRequired,
      weightCapacity: product.specifications?.weightCapacity,
    },
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(productInputSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCategoryChange = (categories: string[]) => {
    formik.setFieldValue("categories", categories);
  };

  const options = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  // if (!categories) return <></>;
  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <ProductCategoriesForm setCategories={handleCategoryChange} />
      <ProductUpdateAttachedImages
        urlImages={product.images.map((image) => image.url)}
      />
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Product Name"
          name="name"
          placeholder="Product Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : undefined
          }
          fullWidth
          hasError={formik.touched.name && Boolean(formik.errors.name)}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Product Description"
          name="description"
          placeholder="Product Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : undefined
          }
          fullWidth
          hasError={
            formik.touched.description && Boolean(formik.errors.description)
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Product Price"
          name="price"
          placeholder="Product Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={
            formik.touched.price && formik.errors.price
              ? formik.errors.price
              : undefined
          }
          fullWidth
          hasError={formik.touched.price && Boolean(formik.errors.price)}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Product Quantity"
          name="quantity"
          placeholder="Product Quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={
            formik.touched.quantity && formik.errors.quantity
              ? formik.errors.quantity
              : undefined
          }
          fullWidth
          hasError={formik.touched.quantity && Boolean(formik.errors.quantity)}
        />
      </Grid>

      {/* ------------- Specifications ------------- */}
      <Divider flexItem sx={{ flexGrow: 1 }}>
        <Typography variant="caption" color="textSecondary">
          Optional Fields
        </Typography>
      </Divider>

      <Grid
        container
        sx={{ justifyContent: "center", alignItems: "stretch" }}
        spacing={3}
      >
        {/* dimensions */}
        <Grid size={{ xs: 12 }}>
          <TextField
            name="specifications.dimensions.height"
            label="Specifications Height"
            placeholder="Specifications Height"
            value={formik.values.specifications.dimensions.height}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={
              formik.touched.specifications?.dimensions?.height &&
              Boolean(formik.errors.specifications?.dimensions?.height)
            }
            helperText={
              formik.touched.specifications?.dimensions?.height &&
              Boolean(formik.errors.specifications?.dimensions?.height)
                ? formik.errors.specifications?.dimensions?.height
                : undefined
            }
            hasError={
              formik.touched.specifications?.dimensions?.height &&
              Boolean(formik.errors.specifications?.dimensions?.height)
            }
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            name="specifications.dimensions.width"
            label="Specifications Width"
            placeholder="Specifications Width"
            value={formik.values.specifications.dimensions.width}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            type="number"
            error={
              formik.touched.specifications?.dimensions?.width &&
              Boolean(formik.errors.specifications?.dimensions?.width)
            }
            helperText={
              formik.touched.specifications?.dimensions?.width &&
              Boolean(formik.errors.specifications?.dimensions?.width)
                ? formik.errors.specifications?.dimensions?.width
                : undefined
            }
            hasError={
              formik.touched.specifications?.dimensions?.width &&
              Boolean(formik.errors.specifications?.dimensions?.width)
            }
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            name="specifications.dimensions.depth"
            label="Specifications Depth"
            placeholder="Specifications Depth"
            value={formik.values.specifications.dimensions.depth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            type="number"
            error={
              formik.touched.specifications?.dimensions?.depth &&
              Boolean(formik.errors.specifications?.dimensions?.depth)
            }
            helperText={
              formik.touched.specifications?.dimensions?.depth &&
              Boolean(formik.errors.specifications?.dimensions?.depth)
                ? formik.errors.specifications?.dimensions?.depth
                : undefined
            }
            hasError={
              formik.touched.specifications?.dimensions?.depth &&
              Boolean(formik.errors.specifications?.dimensions?.depth)
            }
          />
        </Grid>

        {/* dimensions */}

        {/* others */}
        <Grid size={{ xs: 12 }}>
          <TextField
            name="specifications.weightCapacity"
            label="Specifications Weight Capacity"
            placeholder="Specifications Weight Capacity"
            value={formik.values.specifications.weightCapacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            type="number"
            error={
              formik.touched.specifications?.weightCapacity &&
              Boolean(formik.errors.specifications?.weightCapacity)
            }
            helperText={
              formik.touched.specifications?.weightCapacity &&
              Boolean(formik.errors.specifications?.weightCapacity)
                ? formik.errors.specifications?.weightCapacity
                : undefined
            }
            hasError={
              formik.touched.specifications?.weightCapacity &&
              Boolean(formik.errors.specifications?.weightCapacity)
            }
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            name="specifications.material"
            label="Specifications Material"
            placeholder="Specifications Material"
            value={formik.values.specifications.material}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            name="specifications.finish"
            label="Specifications Finish"
            placeholder="Specifications Finish"
            value={formik.values.specifications.finish}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={
              formik.touched.specifications?.finish &&
              Boolean(formik.errors.specifications?.finish)
            }
            helperText={
              formik.touched.specifications?.finish &&
              Boolean(formik.errors.specifications?.finish)
            }
            hasError={
              formik.touched.specifications?.finish &&
              Boolean(formik.errors.specifications?.finish)
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            select
            name="specifications.assemblyRequired"
            label="Specifications Assembly Required"
            placeholder="Specifications Assembly Required"
            value={formik.values.specifications.assemblyRequired}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={
              formik.touched.specifications?.assemblyRequired &&
              Boolean(formik.errors.specifications?.assemblyRequired)
            }
            helperText={
              formik.touched.specifications?.assemblyRequired &&
              Boolean(formik.errors.specifications?.assemblyRequired)
            }
            hasError={
              formik.touched.specifications?.assemblyRequired &&
              Boolean(formik.errors.specifications?.assemblyRequired)
            }
            isSelect
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={String(option.value)}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {/* {others} */}
      </Grid>
      <Divider flexItem sx={{ flexGrow: 1 }}>
        <Typography variant="caption" color="textSecondary">
          Optional Fields
        </Typography>
      </Divider>
      <Grid size={{ xs: 12 }}>
        <SubmitButton fullWidth isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default ProductUpdateForm;
