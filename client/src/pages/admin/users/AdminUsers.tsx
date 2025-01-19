import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import AdminUserTable from "../../../components/users_/admin/user-table/AdminUserTable";
import CircleLoadingGrid from "../../../components/common/loaders/CircleLoadingGrid";
import { useGetUsersWithPagination } from "../../../hooks/user";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";

const AdminUsers = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const {
    data: users,
    isLoading,
    error,
    refetch,
    isError,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useGetUsersWithPagination({
    limit: paginationModel.pageSize,
    page: paginationModel.page,
  });

  console.log("paginationModel", paginationModel);

  if (isLoading || isFetching) return <CircleLoadingGrid />;
  if (error) return <ObjectNotFound object="User" onReload={refetch} />;
  if (!users) return <ObjectNotFound object="User" onReload={refetch} />;

  return (
    <Grid sx={{ ...gridContainerCenter }}>
      <AdminUserTable
        isFetching={isFetching}
        refetch={refetch}
        users={users.docs}
        totalDocs={users?.totalDocs}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </Grid>
  );
};

export default AdminUsers;
