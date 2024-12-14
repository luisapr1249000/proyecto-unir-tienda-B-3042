import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FormikProps } from "formik";
import { ProductInput } from "../../../types/product";
import { PaginationResultCategories } from "../../../types/paginationResult";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    elevation: 3,
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const ProductAddCategories = ({
  handleSetCategories,
  categoryNameList,
  categories,
}: {
  handleSetCategories: (categories: string[]) => void;
  categoryNameList?: string[];
  categories: PaginationResultCategories;
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleChange = (e: SelectChangeEvent<typeof selectedCategories>) => {
    const value = e.target.value;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    if (categoryNameList) {
      const categoriesNames = categories.docs
        .filter((category) => categoryNameList.includes(category.name))
        .map((category) => category.name);
      setSelectedCategories(categoriesNames ?? []);
    }

    if (selectedCategories) {
      const categoriesId = categories.docs
        .filter((category) => selectedCategories.includes(category.name))
        .map((category) => category._id);
      handleSetCategories(categoriesId);
    }
  }, [selectedCategories]);

  return (
    <Grid
      container
      size={{ xs: 12 }}
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Grid component={FormControl} required fullWidth size={{ xs: 12 }}>
        <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
        <Select
          required
          fullWidth
          MenuProps={MenuProps}
          multiple
          value={selectedCategories}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip clickable key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {categories.docs.map((category) => (
            <MenuItem divider key={category._id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default ProductAddCategories;
