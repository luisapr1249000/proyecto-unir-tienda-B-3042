import Grid from "@mui/material/Grid2";
import {
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";

const ProductSpecificationsForm = ({ formik }: { formik: any }) => {
  return (
    <Grid
      container
      size={{ xs: 12 }}
      sx={{ justifyContent: "space-around", alignItems: "stretch" }}
    >
      <Grid
        container
        component={Card}
        sx={{ p: 3 }}
        variant="outlined"
        size={{ xs: 12, md: 6 }}
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
        size={{ xs: 12, md: 6 }}
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

        <Grid size={{ xs: 12, md: 6 }}>
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

        <Grid size={{ xs: 12, md: 6 }}>
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
    </Grid>
  );
};

export default ProductSpecificationsForm;
