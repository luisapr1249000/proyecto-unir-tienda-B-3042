import React from "react";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";

const AnswerContent = ({ answer }: { answer: string }) => {
  return (
    <Grid component={Grid} spacing={2} container sx={{ alignItems: "center" }}>
      <Grid size={{ xs: "auto" }} sx={{}}>
        <SubdirectoryArrowRightIcon
          fontSize="small"
          sx={{ color: "text.secondary" }}
        />
      </Grid>
      <Grid size={{ xs: "grow" }} sx={{}}>
        <TextField
          focused={false}
          size="small"
          fullWidth
          variant="standard"
          value={answer}
          label="Seller"
          slotProps={{ input: { readOnly: true } }}
        />
      </Grid>
    </Grid>
  );
};

export default AnswerContent;
