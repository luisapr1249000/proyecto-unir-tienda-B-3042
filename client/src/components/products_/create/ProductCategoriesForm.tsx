import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useGetCategoriesWithPagination } from "../../../hooks/categories.hooks";
import GridLoadingSkeleton from "../../common/load-spinner/GridLoadingSkeleton";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProductCategoriesForm = ({
  setCategories,
}: {
  setCategories: (id: string[]) => void;
}) => {
  const { data: categories, isLoading } = useGetCategoriesWithPagination({
    limit: 50,
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleChange = (e: SelectChangeEvent<typeof selectedCategories>) => {
    setSelectedCategories(
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value
    );
  };

  useEffect(() => {
    if (selectedCategories.length > 0 && categories) {
      setCategories(
        categories.docs
          .filter((category) => selectedCategories.includes(category.name))
          .map((category) => category._id)
      );
    }
  }, [selectedCategories]);

  if (isLoading) return <GridLoadingSkeleton />;

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectedCategories}
        onChange={handleChange}
        input={<OutlinedInput label="Categories" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {categories?.docs.map((category) => (
          <MenuItem value={category.name}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Chip label={category.name} />
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductCategoriesForm;
