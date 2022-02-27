import React from "react";

import { Box, Button, Typography } from "@mui/material";

import { Add, Remove } from "@mui/icons-material";
import { DownvoteButton, UpvoteButton } from "@components/Buttons/VoteButtons";

interface PostSideProps {
  ratingCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const PostSide: React.FC<PostSideProps> = ({
  ratingCount,
  isOpen,
  onToggle,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: -80,
        top: 0,
        width: 70,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <UpvoteButton />
        <Typography align="center" color="text.secondary">
          {ratingCount}
        </Typography>
        <DownvoteButton />
        <Button
          onClick={onToggle}
          sx={{
            color: "text.secondary",
            mt: 2,
            transform: "scale(0.5)",
            "&:hover": {
              bgcolor: "grey.700",
              color: "grey.300",
            },
          }}
          variant="outlined"
          color="inherit"
        >
          {isOpen ? <Remove /> : <Add />}
        </Button>
      </Box>
    </Box>
  );
};
