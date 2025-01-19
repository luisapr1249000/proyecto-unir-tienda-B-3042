import React from "react";
import { useGetUserById } from "../../../hooks/user";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import CircleLoadingGrid from "../../../components/common/loaders/CircleLoadingGrid";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import AdminUserEditorForm from "../../../components/admin/users/AdminUserEditorForm";

const AdminUser = () => {
  const { userId } = useParams() as { userId: string };
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserById({
    userId,
    queryKey: ["admin-user", userId],
  });

  console.log(user);
  console.log(userId);
  if (isLoading) return <CircleLoadingGrid />;
  if (error) return <ObjectNotFound object="User" onReload={refetch} />;
  if (!user) return <ObjectNotFound object="User" onReload={refetch} />;

  return (
    <Grid
      sx={{
        p: 3,
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">Edit User Information</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <AdminUserEditorForm user={user} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AdminUser;
