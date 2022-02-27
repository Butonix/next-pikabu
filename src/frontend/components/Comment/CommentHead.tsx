import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

import { Avatar, Box, Typography } from "@mui/material";
import { DownvoteButton, UpvoteButton } from "@components/Buttons/VoteButtons";

interface CommentHeadProps {
  author: string;
  rating: number;
  createdAt: string;
}

export const CommentHead: React.FC<CommentHeadProps> = ({
  author,
  createdAt,
  rating,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <UpvoteButton size="small" sx={{ mx: -2.75 }} />
      <Typography variant="body2" sx={{ zIndex: 199, color: "text.secondary" }}>
        +21341
      </Typography>
      <DownvoteButton size="small" sx={{ mx: -2.75 }} />
      <Avatar sx={{ height: 20, width: 20 }}>A</Avatar>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        {author}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        {formatDistanceToNow(new Date(createdAt), { locale: ru })} назад
      </Typography>
    </Box>
  );
};
