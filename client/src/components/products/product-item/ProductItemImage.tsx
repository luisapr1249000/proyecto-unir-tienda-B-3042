import React from "react";
import Grid from "@mui/material/Grid2";
import { CardMedia } from "@mui/material";

const ProductItemImage = ({ imageUrl }: { imageUrl: string }) => {
  console.log(imageUrl);
  return (
    <Grid container size={{ xs: 5 }} sx={{ height: 1 }}>
      <CardMedia
        sx={{
          objectFit: "cover",
          height: 1,
          width: 1,
          transition: (theme) => theme.transitions.create("transform"),
          "&:hover": { transform: "scale(1.1)" },
        }}
        component="img"
        image={imageUrl}
      />
    </Grid>
  );
};

export default ProductItemImage;
