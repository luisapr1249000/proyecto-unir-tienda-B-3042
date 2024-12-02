import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import {
  Box,
  Button,
  Card,
  Divider,
  MobileStepper,
  Paper,
  Skeleton,
} from "@mui/material";
import { Product } from "../../../../types/product";

const ProductItemImage = ({ product }: { product: Product }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [loadingImage, setLoadingImage] = useState(true);

  const nextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex >= product.images.length - 1 ? 0 : prevIndex + 1
    );
    setLoadingImage(true);
  };

  const backImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
    setLoadingImage(true);
  };

  const onLoad = () => {
    setLoadingImage(false);
  };
  return (
    <Grid
      container
      size={{ xs: 12, md: 4 }}
      spacing={1.5}
      sx={{
        justifyContent: "center",
        alignContent: "center",
        p: 3,
      }}
    >
      {loadingImage && (
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{ height: 450, width: 1 }}
        />
      )}
      <Box
        alt={product.name}
        sx={{
          borderRadius: 0.5,
          boxShadow: 2,
          height: 450,
          width: 1,
          objectPosition: "center",
          objectFit: "cover",
          display: loadingImage ? "none" : "flex",
        }}
        component="img"
        onLoad={onLoad}
        src={product.images[imageIndex].url}
      />

      <MobileStepper
        sx={{ flexGrow: 1 }}
        nextButton={
          <Button
            size="small"
            endIcon={<KeyboardArrowRight />}
            onClick={nextImage}
          >
            next
          </Button>
        }
        backButton={
          <Button
            size="small"
            startIcon={<KeyboardArrowLeft />}
            onClick={backImage}
          >
            back
          </Button>
        }
        steps={product.images.length}
        position="static"
        activeStep={imageIndex}
      />
    </Grid>
  );
};

export default ProductItemImage;
