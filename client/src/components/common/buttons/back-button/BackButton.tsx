import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle the "Go Back" action
  const handleGoBack = () => {
    navigate(-1); // Navigate back within the app
  };

  // Check if state exists and if canGoBack is true
  const canGoBack = location.key;

  return (
    canGoBack && (
      <Button
        onClick={handleGoBack}
        startIcon={<ArrowBackIcon />}
        variant="contained"
      >
        Volver
      </Button>
    )
  );
};

export default BackButton;
