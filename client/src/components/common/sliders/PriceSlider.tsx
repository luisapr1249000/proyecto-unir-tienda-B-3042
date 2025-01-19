import React, { useState } from "react";
import { Slider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ButtonLink } from "../buttons/link/ButtonLink";
import {
  useGetProductsByCategoryWithPagination,
  useGetProductsWithPagination,
} from "../../../hooks/products.hooks";
import { Mark } from "@mui/material/Slider/useSlider.types";
import usePriceStore from "../../../zustand/priceSlice";

export const PriceSliderContainer = ({
  marks,
  max,
  min = 0,
  link,
}: {
  marks: Mark[];
  max: number;
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
      sx={{ width: 1, justifyContent: "center", alignItems: "center", p: 1 }}
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
      <ButtonLink to={link ?? ""}>Go</ButtonLink>
    </Grid>
  );
};
