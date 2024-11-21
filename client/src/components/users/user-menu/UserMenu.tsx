import React from "react";
import { User } from "../../../types/user";

const UserMenu = ({ user }: { user: User }) => {
  const listOptions = [
    {
      label: "Actualiza tu informacion",
      link: `account/${user.username}/update`,
      description: "something i used to have. ",
      icon: <AccountBoxIcon fontSize="small" />,
    },
    {
      label: "Direcciones de Entrega",
      link: `account/${user.username}/address-directions`,
      description: "something i used to have. ",
      icon: <AccountBoxIcon fontSize="small" />,
    },
    {
      label: "Informacion General",
      link: `account/${user.username}/general-information`,

      description: "something i used to have. ",
      icon: <AccountBoxIcon fontSize="small" />,
    },
    {
      label: "Tu something",
      link: "actualizar",

      description: "something i used to have. ",
      icon: <AccountBoxIcon fontSize="small" />,
    },
    {
      label: "Tu etc",
      link: "actualizar",
      description: "something i used to have. ",
      icon: <AccountBoxIcon fontSize="small" />,
    },
  ];

  return <div>UserMenu</div>;
};

export default UserMenu;
