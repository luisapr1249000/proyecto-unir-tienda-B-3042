import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CancelButton from "../../common/buttons/cancel-button/CancelButton";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { reportInputSchema } from "../../../validation-schemas/report.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReport } from "../../../api/productReport.api";
import { toast } from "react-toastify";

const DialogProductReport = ({
  onCloseDialog,
  isDialogOpen,
  productId,
}: {
  onCloseDialog: () => void;
  isDialogOpen: boolean;
  productId: string;
}) => {
  // const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      toast.success("Report Created");
    },
    onError: () => {
      toast.error("Please check your credentials.");
    },
  });
  const initialValues = { reason: "" };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(reportInputSchema),
    onSubmit: ({ reason }) => mutate({ productId, reason }),
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Dialog fullWidth onClose={onCloseDialog} open={isDialogOpen}>
        <DialogTitle>Fill out the Report Form</DialogTitle>
        <IconButton
          onClick={onCloseDialog}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <ClearIcon />
        </IconButton>

        <Divider />
        <DialogContent>
          <TextField
            autoFocus
            required
            id="reason"
            name="reason"
            label="Reason"
            multiline
            rows={4}
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reason}
          />
        </DialogContent>
        <Divider />

        <DialogActions>
          <SubmitButton />
          <CancelButton onCancel={onCloseDialog} />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DialogProductReport;
