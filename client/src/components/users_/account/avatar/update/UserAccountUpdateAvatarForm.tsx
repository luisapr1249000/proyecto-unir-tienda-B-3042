import React from "react";
import ButtonInputFile from "../../../../common/buttons/button-input-file/ButtonInputFile";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { avatarSchema } from "../../../../../validation-schemas/image.validation";
import { Divider } from "@mui/material";
import CancelButton from "../../../../common/buttons/cancel-button/CancelButton";
import SubmitButton from "../../../../common/buttons/submit-button/SubmitButton";
import DisplayImagePreview from "../../../../common/display-image-preview/DisplayImagePreview";
import { useMutation } from "@tanstack/react-query";
import { uploadUserAvatar } from "../../../../../api/users/user.api";
import { toast } from "react-toastify";
import CircleLoadingGrid from "../../../../common/loading/CircleLoadingGrid";

const UserAccountUpdateAvatarForm = () => {
  const { mutate: uploadUserAvatarMutation, isPending } = useMutation({
    mutationFn: uploadUserAvatar,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Image uploaded successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error uploading image");
    },
  });

  const initialValues = {
    avatar: undefined,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(avatarSchema),
    onSubmit: ({ avatar }) => {
      if (!avatar) return;
      uploadUserAvatarMutation(avatar);
    },
  });
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget?.files?.[0];
    if (!file) return;
    formik.setFieldValue("avatar", file);
  };

  const onDeleteFile = () => {
    if (formik.values.avatar) formik.setFieldValue("avatar", undefined);
  };

  if (isPending) return <CircleLoadingGrid />;

  return (
    <Grid
      // container
      spacing={2}
      direction="column"
      component="form"
      onSubmit={formik.handleSubmit}
      // sx={{ border: 1 }}
    >
      <ButtonInputFile onChange={onChangeFile} />

      {formik.values.avatar && (
        <Grid sx={{ my: 2 }}>
          <DisplayImagePreview
            onDeleteFile={onDeleteFile}
            selectedFiles={[formik.values.avatar]}
          />

          <Grid
            container
            spacing={3}
            direction={{ xs: "column", md: "row" }}
            sx={{ my: 2 }}
          >
            <SubmitButton isValid={formik.isValid} />
            <CancelButton onCancel={onDeleteFile} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default UserAccountUpdateAvatarForm;
