import React, { useState } from "react";

import { Box, Button } from "@mui/material";

import { Add, Remove } from "@mui/icons-material";

import { AuthModal } from "@components/AuthModal";

import { PostRating } from "@components/Rating/PostRating";

interface PostSideProps {
  post_id: string;
  rating: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const PostSide: React.FC<PostSideProps> = ({
  post_id,
  rating,
  isOpen,

  onToggle,
}) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prevSt) => !prevSt);
  };

  return (
    <>
      <AuthModal open={open} onClick={toggleModal} />
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
        <PostRating
          post_id={post_id}
          rating={rating}
          onUnauthAction={toggleModal}
        />

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
    </>
  );
};
