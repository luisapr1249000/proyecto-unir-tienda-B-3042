import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid2";
import { BorderIconButton } from "../../../../common/buttons/iconbutton-delete/IconButtonDelete";
import { Link } from "../../../../common/react-link/Link";

const HeaderAccessButtons = () => {
  const settings = [
    {
      label: "Login",
      link: "/auth/login",
      icon: <LogoutIcon />,
    },
    {
      label: "Signup",
      link: "auth/signup",
      icon: <PersonAddIcon />,
    },
  ];

  const isSignupButton = (label: string) => label === "Signup";
  return (
    <Grid
      sx={{ justifyContent: "flex-end" }}
      size={{ xs: "grow" }}
      container
      spacing={2}
    >
      {settings.map((setting) => (
        <Link sx={{ color: "inherit" }} key={setting.link} to={setting.link}>
          <BorderIconButton
            size="small"
            color={isSignupButton(setting.label) ? "primary" : "default"}
            key={setting.link}
            tooltipTitle={setting.label}
          >
            {setting.icon}
          </BorderIconButton>
        </Link>
      ))}
    </Grid>
  );
};
export default HeaderAccessButtons;
