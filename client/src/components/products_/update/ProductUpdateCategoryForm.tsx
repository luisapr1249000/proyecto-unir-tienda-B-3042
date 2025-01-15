import { Box, Chip, Divider, Typography } from "@mui/material";
import GridLoadingSkeleton from "../../common/load-spinner/GridLoadingSkeleton";
import { useGetCategoriesWithPagination } from "../../../hooks/categories.hooks";
import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ProductUpdateCategoryForm = ({
  setCategories,
}: {
  setCategories: (id: string[]) => void;
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>();
  const handleChange = (e: SelectChangeEvent<typeof selectedCategories>) => {
    setSelectedCategories(
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value
    );
  };

  useEffect(() => {
    if (categoryList.length > 0) {
      setSelectedCategories(categoryList);
      setCategories(selectedCategories);
    }
  }, []);

  if (!categories) return <></>;

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
        {categories.map((category) => (
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

export default ProductUpdateCategoryForm;
