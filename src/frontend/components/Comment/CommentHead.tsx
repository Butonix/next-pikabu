import React, { useState } from "react";

import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

import { Avatar, Box, Typography } from "@mui/material";

import { CommentRating } from "@components/Rating/CommentRating";
import { AuthModal } from "@components/AuthModal";

interface CommentHeadProps {
  author: string;
  rating: number;
  createdAt: string;
  comment_id: string;
}

export const CommentHead: React.FC<CommentHeadProps> = ({
  author,
  createdAt,
  rating,
  comment_id,
}) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prevSt) => !prevSt);
  };
  return (
    <>
      <AuthModal open={open} onClick={toggleModal} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CommentRating
          comment_id={comment_id}
          onUnauthAction={toggleModal}
          rating={rating}
        />
        <Link href={`/users/${author}`}>
          <Avatar sx={{ height: 20, width: 20, cursor: "pointer" }}>A</Avatar>
        </Link>
        <Link href={`/users/${author}`}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {author}
          </Typography>
        </Link>

        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {formatDistanceToNow(new Date(createdAt), {
            locale: ru,
            addSuffix: true,
          })}
        </Typography>
      </Box>
    </>
  );
};
