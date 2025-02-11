import { CardContent, CardMedia, Paper } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { ProductProp } from "../../../../types/product";
import ContainerCircleLoader from "../../../common/loaders/ContainerCircleLoader";

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
  <Paper component={Grid} size={{ xs: 12 }} container sx={{ height: 0.85 }}>
    {loading && <ContainerCircleLoader />}
    <CardMedia
      sx={{ borderRadius: 1, display: loading ? "none" : "block" }}
      component="img"
      height={"100%"}
      image={src}
      alt={alt}
      onLoad={onLoad}
    />
  </Paper>
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
  <Grid sx={{ height: 0.1 }} size={{ xs: 12 }}>
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
  </Grid>
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
        height: 1,
        borderRight: 1,
        borderColor: "divider",
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
