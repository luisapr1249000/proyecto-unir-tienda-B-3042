import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BaseListItems from "../../../common/base-list-items/BaseListItems";
import { useOutletContext } from "react-router-dom";
import { User } from "../../../../types/user";

const UserAccountSideMenu = () => {
  const context = useOutletContext<User>();
  const listOptions = [
    {
      label: "Actualiza tu informacion",
      link: `account/${context.username}/update`,
      description: "something i used to have. ",
      icon: <AccountBoxIcon fontSize="small" />,
    },
    {
      label: "Direcciones de Entrega",
      link: `account/${context.username}/address-directions`,
      description: "something i used to have. ",
      icon: <AccountBoxIcon fontSize="small" />,
    },
    {
      label: "Informacion General",
      link: `account/${context.username}/general-information`,

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

  return (
    <>
      {listOptions.map((option) => (
        <BaseListItems
          key={option.label}
          label={option.label}
          link={option.link}
          icon={option.icon}
        />
      ))}
    </>
  );
};

export default UserAccountSideMenu;
