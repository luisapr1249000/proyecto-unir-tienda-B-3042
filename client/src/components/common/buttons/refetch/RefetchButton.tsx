import { Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

const RefetchButton = ({
  size,
  fullWidth,
  onRefetch,
}: {
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  onRefetch: () => void;
}) => (
  <Button
    size={size}
    fullWidth={fullWidth}
    startIcon={<ReplayIcon />}
    variant="outlined"
    onClick={onRefetch}
  >
    Refetch
  </Button>
);

export default RefetchButton;
