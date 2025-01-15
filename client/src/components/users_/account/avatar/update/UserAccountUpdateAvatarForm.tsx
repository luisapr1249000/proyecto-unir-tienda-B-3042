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

const UserAccountUpdateAvatarForm = () => {
  const initialValues = {
    avatar: undefined,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(avatarSchema),
    onSubmit: (values) => {
      console.log(values);
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
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <ButtonInputFile onChange={onChangeFile} />

      {formik.values.avatar && (
        <>
          <Divider />

          <DisplayImagePreview
            onDeleteFile={onDeleteFile}
            files={[formik.values.avatar]}
          />

          <Divider />

          <SubmitButton isValid={formik.isValid} />
          <CancelButton onCancel={onDeleteFile} />
        </>
      )}
    </Grid>
  );
};

export default UserAccountUpdateAvatarForm;
