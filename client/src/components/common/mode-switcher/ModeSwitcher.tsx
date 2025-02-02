import { useColorScheme } from "@mui/material/styles";
import { Button, ButtonGroup } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) return null;

  const options = [
    { label: "dark", icon: <DarkModeIcon /> },
    { label: "system", icon: <SettingsBrightnessIcon /> },
    { label: "light", icon: <LightModeIcon /> },
  ];

  return (
    <ButtonGroup size="small">
      {options.map((option) => (
        <Button
          key={option.label}
          startIcon={option.icon}
          onClick={() => setMode(option.label as "light" | "dark" | "system")}
          variant={mode === option.label ? "contained" : "outlined"}
          color="primary"
          sx={{
            width: 110,
          }}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ModeSwitcher;
