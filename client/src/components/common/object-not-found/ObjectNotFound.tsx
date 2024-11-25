import React from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import HomeButton from "../buttons/home-button/HomeButton";

const ObjectNotFound = ({
  object = "Page",
  multiple = false,
  onReload,
}: {
  object: "Product" | "User" | "Comment" | "Category" | "Page";
  onReload: () => void;
  multiple?: boolean;
}) => {
  const isMultiple = multiple ? `${object}s` : object;
  const message = `${isMultiple} Not Found `;
  const createDescription = (objectNotFound: string) =>
    `The ${objectNotFound} might not exist `;
  console.log(message);
  return (
    <Grid container sx={[gridContainerCenter, { height: "calc(100vh)" }]}>
      <Grid size={{ xs: 6 }} component={Card} variant="outlined">
        <CardContent>
          <Alert severity="warning">
            <AlertTitle>
              <Typography gutterBottom variant="h5" component="div">
                {message}
              </Typography>
              {/* <Typography gutterBottom>{createDescription(object)}</Typography> */}
              <Typography color="textSecondary" gutterBottom variant="body2">
                Try looking up other or Go home
              </Typography>
            </AlertTitle>
          </Alert>
        </CardContent>
        {/* <Divider />

        <CardContent
          component={Grid}
          spacing={1}
          container
          direction="column"
        ></CardContent> */}
        <Divider />
        <CardActions>
          <Button variant="contained" onClick={onReload}>
            Retry
          </Button>
          <HomeButton />
        </CardActions>
      </Grid>
    </Grid>
  );
};

export default ObjectNotFound;
