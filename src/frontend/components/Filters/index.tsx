import { Box, Toolbar } from "@mui/material";
import React from "react";
import { CustomFilter } from "./CustomFilter";
import { DateFilter } from "./DateFilter";

interface FiltersProps {}

export const Filters: React.FC<FiltersProps> = (props) => {
  return (
    <Box sx={{ display: "flex", marginBottom: 2, gap: 2 }}>
      <DateFilter />
      <CustomFilter />
    </Box>
  );
};
