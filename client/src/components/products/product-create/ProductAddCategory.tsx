import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Button,
  Card,
  Chip,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { ProductInput } from "../../../types/product";
import { useGetCategories } from "../../../hooks/category";
import { toast } from "react-toastify";

const ProductAddCategories = ({
  formik,
}: {
  formik: FormikProps<ProductInput>;
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddCategories = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedCategory(e.target.value);

  const handleAddCategory = () => {
    if (selectedCategory.trim()) {
      if (!formik.values.categories.includes(selectedCategory)) {
        formik.setFieldValue("categories", [
          ...formik.values.categories,
          selectedCategory.trim(),
        ]);
        setSelectedCategory("");
      } else {
        toast.error("Category already added");
      }
    }
  };

  const { data } = useGetCategories({ page: 1, limit: 50 });

  console.log(data);
  console.log(formik.values.categories);
  console.log(selectedCategory);

  const handleDeleteCategory = (categoryToDelete: string) => {
    const updatedCategories = formik.values.categories.filter(
      (category) => category !== categoryToDelete
    );
    formik.setFieldValue("categories", updatedCategories);
  };

  const handleClearCategories = () => {
    formik.setFieldValue("categories", []);
  };
  return (
    <Grid
      container
      size={{ xs: 12 }}
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Grid size={{ xs: 6 }}>
        <TextField
          select
          required
          name="categories"
          label="Categories"
          placeholder="categories"
          value={selectedCategory}
          onChange={handleAddCategories}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.categories && Boolean(formik.errors.categories)}
          helperText={
            formik.touched.categories && Boolean(formik.errors.categories)
              ? formik.errors.categories
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.categories && Boolean(!formik.errors.categories)
              ? true
              : undefined
          }
          color={
            formik.touched.categories && Boolean(!formik.errors.categories)
              ? "success"
              : undefined
          }
        >
          {data && data.docs.length > 0 ? (
            data.docs.map((categories) => (
              <MenuItem key={categories._id} value={categories.name}>
                {categories.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Loading categories...</MenuItem>
          )}
        </TextField>
      </Grid>
      <Grid container spacing={1} size={{ xs: 5 }}>
        <Button variant="outlined" onClick={handleAddCategory}>
          Add category
        </Button>
        {formik.values.categories.length >= 1 && (
          <Button
            onClick={handleClearCategories}
            variant="outlined"
            color="error"
          >
            Reset
          </Button>
        )}
      </Grid>
      {formik.values.categories.length >= 1 && (
        <Grid spacing={1} container sx={{ mt: 2 }} size={{ xs: 12 }}>
          {formik.values.categories.map((category, key) => (
            <Chip
              onDelete={() => handleDeleteCategory(category)}
              key={key}
              label={category}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default ProductAddCategories;
