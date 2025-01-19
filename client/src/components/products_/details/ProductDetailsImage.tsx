import { Box, CardContent, Paper, Skeleton } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { ProductProp } from "../../../types/product";
import { blue, grey } from "@mui/material/colors";

const ImageDisplay = ({
  src,
  alt,
  loading,
  onLoad,
}: {
  src: string;
  alt: string;
  loading: boolean;
  onLoad: () => void;
}) => (
  <>
    {loading && (
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ height: 450, width: 1 }}
      />
    )}
    <Paper
      sx={{
        height: 450,
        width: 1,
        objectPosition: "center",
        objectFit: "cover",
        display: loading ? "none" : "flex",
        border: 1,
        borderColor: "grey.500",
      }}
      elevation={5}
      onLoad={onLoad}
      component="img"
      src={src}
      alt={alt}
    />
  </>
);

const ImageControls = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
}: {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}) => (
  <MobileStepper
    sx={{ flexGrow: 1 }}
    nextButton={
      <Button size="small" endIcon={<KeyboardArrowRight />} onClick={onNext}>
        Next
      </Button>
    }
    backButton={
      <Button size="small" startIcon={<KeyboardArrowLeft />} onClick={onBack}>
        Back
      </Button>
    }
    steps={totalSteps}
    position="static"
    activeStep={currentStep}
  />
);

const ProductDetailsImage = ({ product }: ProductProp) => {
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
    <CardContent
      component={Grid}
      container
      size={{ xs: 12, md: "grow" }}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        borderRight: 1,
        borderColor: "divider",
        // p: 3,
      }}
    >
      <ImageDisplay
        src={product.images[imageIndex].url}
        alt={product.name}
        loading={loadingImage}
        onLoad={onLoad}
      />
      <ImageControls
        currentStep={imageIndex}
        totalSteps={product.images.length}
        onNext={nextImage}
        onBack={backImage}
      />
    </CardContent>
  );
};

export default ProductDetailsImage;
