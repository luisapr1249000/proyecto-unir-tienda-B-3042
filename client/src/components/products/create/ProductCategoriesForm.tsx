import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useGetCategoriesWithPagination_ } from "../../../hooks/categories.hooks";
import { Typography } from "@mui/material";
import { useState } from "react";
import ContainerCircleLoader from "../../common/loaders/ContainerCircleLoader";

const ProductCategoriesForm = ({
  setCategories,
}: {
  setCategories: (id: string[]) => void;
}) => {
  const { data: categories, isLoading } = useGetCategoriesWithPagination_({
    limit: 50,
  });

  const [layoutSelectedCategories, setLayoutSelectedCategories] = useState<
    string[]
  >([]);

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const categoriesName =
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value;

    setLayoutSelectedCategories(categoriesName);
    if (!categories) return;

    const categoryIds = categories.docs
      .filter((category) => categoriesName.includes(category.name))
      .map((category) => category._id);
    setCategories(categoryIds);
  };

  if (isLoading) return <ContainerCircleLoader message="Loading Categories" />;
  if (!categories) return <Typography>No categories found</Typography>;

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={layoutSelectedCategories}
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
        {categories.docs.map((category) => (
          <MenuItem key={category._id} value={category.name}>
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
