import React, { useState } from "react";
import { Slider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ButtonLink } from "../buttons/link/ButtonLink";
import { Mark } from "@mui/material/Slider/useSlider.types";
import usePriceStore from "../../../zustand/priceSlice";

const PriceSlider = ({
  marks,
  max = 500,
  min = 0,
  link,
}: {
  marks: Mark[];
  max?: number;
  min?: number;
  link?: string;
}) => {
  const [value, setValue] = useState<number[]>([1, 500]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    usePriceStore.setState({
      price: { min: (newValue as number[])[0], max: (newValue as number[])[1] },
    });

    console.log("price from slider ", usePriceStore.getState().price);
  };
  const valueText = (value: number) => `${value}$`;

  return (
    <Grid
      container
      direction="column"
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        // border: 1,
      }}
    >
      <Slider
        size="small"
        aria-label="Volume"
        value={value}
        getAriaValueText={valueText}
        valueLabelFormat={valueText}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
        max={max}
        min={min}
        disableSwap
      />
      <ButtonLink variant="outlined" to={link ?? ""}>
        Go
      </ButtonLink>
    </Grid>
  );
};

export default PriceSlider;
