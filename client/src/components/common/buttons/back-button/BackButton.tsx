import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Verifica si hay una entrada anterior en el historial.
    setCanGoBack(window.history.length > 1);
  }, [location]);

  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    canGoBack && (
      <Button onClick={handleGoBack} startIcon={<ArrowBackIcon />}>
        Volver
      </Button>
    )
  );
};

export default BackButton;
