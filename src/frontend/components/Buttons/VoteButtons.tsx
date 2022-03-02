import React from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button, SxProps, Theme } from "@mui/material";

interface ButtonProps {
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
  onClick?: () => void;
  active?: boolean;
}

export const UpvoteButton: React.FC<ButtonProps> = ({
  size = "medium",
  sx,
  onClick,
  active = false,
}) => {
  let k = 1;
  if (size === "small") k = 0.675;
  return (
    <Button
      onClick={onClick}
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
        ...(active
          ? {
              color: "primary.main",
            }
          : {}),
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
  onClick,
  active = false,
}) => {
  let k = 1;
  if (size === "small") k = 0.675;
  return (
    <Button
      onClick={onClick}
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
        ...(active
          ? {
              color: "error.dark",
            }
          : {}),
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
