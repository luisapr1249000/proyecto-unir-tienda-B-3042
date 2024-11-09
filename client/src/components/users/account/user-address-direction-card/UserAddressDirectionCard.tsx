import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import React from "react";
import { AddressDirection } from "../../../../types/user";
import { useAuthUser } from "../../../../hooks/auth";

const UserAddressDirectionCard = ({
  addressDirection,
}: {
  addressDirection: AddressDirection;
}) => {
  const { data: userAuth } = useAuthUser();

  return (
    <Card>
      <CardHeader avatar={<Avatar />} title={userAuth?.username} />
      <CardContent />
      <CardActions>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default UserAddressDirectionCard;
