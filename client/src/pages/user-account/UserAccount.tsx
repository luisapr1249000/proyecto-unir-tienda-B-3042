import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUser } from "../../hooks/user";
import Grid from "@mui/material/Grid2";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  Avatar,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { User } from "../../types/user";
import BackButton from "../../components/common/buttons/back-button/BackButton";
import { useMatches } from "react-router-dom";

const UserAccount = () => {
  const matches = useMatches();
  console.log(matches);
  const { username } = useParams() as { username: string };
  const { data: user } = useGetUser({
    queryKey: [`username-${username}`],
    query: username,
    isUsername: true,
  });

  console.log(user);
  const listOptions = [
    {
      label: "Actualiza tu informacion",
      link: "update",
      description:
        "Lorem ipsum dolor sit amet,  incididunt ut labore et doloru fugiat nulla pariatur. ",
      icon: <AccountBoxIcon fontSize="large" />,
    },
    {
      label: "Direcciones de Entrega",
      link: "address-directions",
      description:
        "Lorem ipsum dolor sit amet,  incididunt ut labore et doloru fugiat nulla pariatur. ",
      icon: <AccountBoxIcon fontSize="large" />,
    },
    {
      label: "Tu la otra",
      link: "actualizar",

      description:
        "Lorem ipsum dolor sit amet,  incididunt ut labore et doloru fugiat nulla pariatur. ",
      icon: <AccountBoxIcon fontSize="large" />,
    },
    {
      label: "Tu something",
      link: "actualizar",

      description:
        "Lorem ipsum dolor sit amet,  incididunt ut labore et doloru fugiat nulla pariatur. ",
      icon: <AccountBoxIcon fontSize="large" />,
    },
    {
      label: "Tu etc",
      link: "actualizar",

      description:
        "Lorem ipsum dolor sit amet,  incididunt ut labore et doloru fugiat nulla pariatur. ",
      icon: <AccountBoxIcon fontSize="large" />,
    },
  ];

  const UserCardGeneralInfo = ({ user }: { user?: User }) => {
    return (
      <ListItemButton>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography color="textSecondary" variant="body2">
                {user?.username}
              </Typography>
            }
            secondary={<Typography variant="body2">{user?.email}</Typography>}
          />
        </ListItem>
      </ListItemButton>
    );
  };

  return (
    <Grid
      size={{ xs: 12 }}
      container
      sx={{
        height: "calc(100vh)",
        justifyContent: "center",
        alignItems: "center",
        border: 1,
      }}
    >
      <BackButton />
      <Grid
        component={Card}
        variant="outlined"
        size={{ xs: 5 }}
        sx={{ height: 800, p: 4 }}
      >
        <List>
          <UserCardGeneralInfo user={user} />
          {listOptions.map((option) => (
            <ListItemButton
              component={Link}
              to={option.link}
              divider
              key={option.label}
            >
              <ListItem secondaryAction={<NavigateNextIcon />}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText
                  primary={option.label}
                  secondary={
                    <Typography color="textSecondary" variant="body2">
                      {option.description}
                    </Typography>
                  }
                />
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default UserAccount;
