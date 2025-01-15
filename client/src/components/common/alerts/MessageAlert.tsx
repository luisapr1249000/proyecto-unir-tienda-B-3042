import React from "react";
import {
  Alert,
  AlertProps,
  AlertTitle,
  CardActions,
  Typography,
} from "@mui/material";

const MessageAlert = ({
  title,
  message,
  severity = "success",
}: {
  title: string;
  message: string;
  severity: AlertProps["severity"];
}) => (
  <Alert severity={severity}>
    <AlertTitle>{title}</AlertTitle>
    <Typography color="textSecondary" variant="body2">
      {message}
    </Typography>
  </Alert>
);

export default MessageAlert;
