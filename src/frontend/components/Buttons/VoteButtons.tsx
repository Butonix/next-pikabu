import React from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button, SxProps, Theme } from "@mui/material";

interface ButtonProps {
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
}

export const UpvoteButton: React.FC<ButtonProps> = ({
  size = "medium",
  sx,
}) => {
  let k = 1;
  if (size === "small") k = 0.675;
  return (
    <Button
      disableRipple
      sx={{
        width: 40 * k,
        height: 20 * k,
        color: "text.secondary",
        overflow: "hidden",
        "&:hover": {
          color: "primary.main",
          bgcolor: "transparent",
        },
        transition: (theme) =>
          theme.transitions.create("all", {
            duration: theme.transitions.duration.standard,
          }),
        ...sx,
      }}
    >
      <ArrowDropUp
        sx={{
          height: 64 * k,
          width: 64 * k,
        }}
      />
    </Button>
  );
};

export const DownvoteButton: React.FC<ButtonProps> = ({
  size = "medium",
  sx,
}) => {
  let k = 1;
  if (size === "small") k = 0.675;
  return (
    <Button
      disableRipple
      sx={{
        width: 20 * k,
        height: 20 * k,
        color: "text.secondary",
        overflow: "hidden",
        "&:hover": {
          color: "error.dark",
          bgcolor: "transparent",
        },
        transition: (theme) =>
          theme.transitions.create("all", {
            duration: theme.transitions.duration.standard,
          }),
        ...sx,
      }}
    >
      <ArrowDropDown
        sx={{
          height: 64 * k,
          width: 64 * k,
        }}
      />
    </Button>
  );
};
