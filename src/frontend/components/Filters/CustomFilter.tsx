import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

export const CustomFilter = () => {
  const [dateOption, setDateOption] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDateOption(event.target.value as string);
  };

  const dateOptions = ["За сегодня", "За неделю", "За месяц", "За все врёмя"];
  return (
    <FormControl variant="outlined" sx={{ minWidth: 130, p: 0 }}>
      <InputLabel id="date-select-label">Дата</InputLabel>
      <Select
        labelId="date-select-label"
        id="date-select"
        value={dateOption}
        onChange={handleChange}
        sx={{ bgcolor: "background.paper" }}
      >
        {dateOptions.map((option) => (
          <MenuItem
            sx={{ bgcolor: "background.paper" }}
            key={option}
            value={option}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
