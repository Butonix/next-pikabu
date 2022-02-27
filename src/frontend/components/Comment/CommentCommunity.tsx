import { Box, Button, Paper, Typography } from "@mui/material";

import React from "react";

interface CommunityProps {
  image: string;
  name: string;
  total_posts: number;
  total_users: number;
}

export const CommentCommunity: React.FC<CommunityProps> = ({
  name,
  total_posts,
  total_users,
  image,
}) => {
  return (
    <Paper variant="outlined" sx={{ px: 3, py: 2, display: "flex" }}>
      <img src={image} alt={name} width={50} height={50} />
      <Box sx={{ pl: 1 }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="caption" color="text.secondary">
          постов {total_posts} • подписчиков {total_users}
        </Typography>
      </Box>
      <Box sx={{ ml: "auto" }}>
        <Button variant="contained" size="medium">
          Подписаться
        </Button>
      </Box>
    </Paper>
  );
};
