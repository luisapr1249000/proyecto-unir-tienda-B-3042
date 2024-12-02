import React, { useEffect, useState } from "react";
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
import { useGetCategoriesWitPagination } from "../../../hooks/category";
import { toast } from "react-toastify";
import ProductDisplayCategories from "./ProductDisplayCategories";

export type CategoryData = {
  categoryId: string;
  categoryName: string;
};

const ProductAddCategories = ({
  formik,
  categoryNameList,
}: {
  formik: FormikProps<ProductInput>;
  isUpdating?: boolean;
  categoryNameList?: string[];
}) => {
  const { data } = useGetCategoriesWitPagination({ page: 1, limit: 50 });

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategoryData[]>(
    []
  );

  useEffect(() => {
    if (categoryNameList) {
      const categories = data?.docs
        .filter((category) => categoryNameList.includes(category.name))
        .map((category) => ({
          categoryId: category._id,
          categoryName: category.name,
        }));
      setSelectedCategories(categories ?? []);
    }
  }, []);
  const getCategoryById = (id: string) =>
    data?.docs.find((category) => category._id === id);

  const handleAddCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = e.target.value;
    if (!categoryId) return;

    const filteredCategory = getCategoryById(categoryId);
    if (!filteredCategory) return;

    const existedCategory = selectedCategories?.find(
      (category) => category.categoryId === categoryId
    );
    if (existedCategory) {
      const categoryObj: CategoryData = {
        categoryId,
        categoryName: existedCategory.categoryName,
      };
      setSelectedCategories((prev) => [...prev, categoryObj]);
      setSelectedCategoryId(categoryId);
    }
    return;
  };

  const handleAddCategory = () => {
    if (!selectedCategoryId.trim()) return;
    const categoryExists =
      formik.values.categories.includes(selectedCategoryId) ||
      selectedCategories.filter(
        (category) => category.categoryId === selectedCategoryId
      );
    if (!categoryExists) {
      formik.setFieldValue("categories", [
        ...formik.values.categories,
        selectedCategoryId.trim(),
      ]);
      setSelectedCategoryId("");
    } else {
      toast.error("Category already added");
    }
  };

  const handleDeleteCategory = (
    categoryNameToDelete: string,
    categoryIdToDelete: string
  ) => {
    const updatedCategories = formik.values.categories.filter(
      (category) => category !== categoryIdToDelete
    );
    const updateCategoriesName = categoriesNames.filter(
      (categoryName) => categoryName !== categoryNameToDelete
    );
    setCategoriesNames(updateCategoriesName);
    formik.setFieldValue("categories", updatedCategories);
  };

  const handleClearCategories = () => {
    formik.setFieldValue("categories", []);
    setCategoriesNames([""]);
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
          value={selectedCategoryId}
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
            data.docs.map((category) => {
              return (
                <MenuItem divider key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              );
            })
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
      {formik.values.categories.length > 0 && (
        <>
          {selectedCategories.map((category) => (
            <ProductDisplayCategories
              onDeleteCategory={() =>
                handleDeleteCategory(category.categoryName, category.categoryId)
              }
              categories={category}
            />
          ))}
        </>
      )}
      {/* {formik.values.categories.length > 0 && (
        <Grid spacing={1} container sx={{ mt: 2 }} size={{ xs: 12 }}>
          {formik.values.categories.map((category, key) => (
            <Chip
              onDelete={() => handleDeleteCategory(category)}
              key={key}
              label={category}
            />
          ))}
        </Grid>
      )} */}
    </Grid>
  );
};

export default ProductAddCategories;
