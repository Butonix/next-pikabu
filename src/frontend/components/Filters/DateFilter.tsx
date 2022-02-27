import React, { useState } from "react";

import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export const DateFilter: React.FC = () => {
  const [dateOption, setDateOption] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDateOption(event.target.value as string);
  };

  const dateOptions = ["За сегодня", "За неделю", "За месяц", "За все врёмя"];

  return (
    <FormControl variant="outlined" sx={{ minWidth: 130, p: 0 }}>
      <InputLabel id="date-select-label">Дата</InputLabel>
      <Select
        variant="filled"
        labelId="date-select-label"
        id="date-select"
        value={dateOption}
        onChange={handleChange}
        sx={{ bgcolor: "background.paper" }}
      >
        {dateOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
