import { TextField } from "@mui/material";
import moment from "moment";
import React from "react";
import { formatDate, isValidDateMoment } from "../../../../../utils/util.dates";

const UserGeneralInformationField = ({
  label,
  value,
}: {
  label: string;
  value: string | boolean | Date;
}) => {
  const checkDate = (valueDate: any) => {
    if (isValidDateMoment(valueDate)) {
      return formatDate(new Date(valueDate));
    }
    return valueDate;
  };
  const data = checkDate(value);
  return (
    <TextField
      fullWidth
      label={label}
      variant="filled"
      size="small"
      slotProps={{
        input: { readOnly: true, sx: { textTransform: "capitalize" } },
        inputLabel: { shrink: true, sx: { textTransform: "capitalize" } },
      }}
      value={data ?? "No Data Available"}
    />
  );
};

export default UserGeneralInformationField;
