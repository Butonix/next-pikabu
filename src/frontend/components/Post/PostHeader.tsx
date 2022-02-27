import { MoreHoriz } from "@mui/icons-material";
import { Avatar, Box, Button, Tooltip, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import React from "react";
const tooltipProps = {
  tooltip: {
    sx: {
      bgcolor: "background.paper",
      p: 0,
      boxShadow: 14,
    },
  },
  arrow: {
    sx: {
      color: "background.paper",
    },
  },
};

interface PostHeaderProps {
  title: string;
  createdAt: string;
  userId: string;
  postId: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  createdAt,
  userId,
  postId,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          position: "relative",
        }}
      >
        <Avatar sx={{ height: 20, width: 20 }}>A</Avatar>
        <Link href={`/`}>
          <Typography
            sx={{ cursor: "pointer", fontSize: 14, fontWeight: 500 }}
            component="a"
          >
            {userId}
          </Typography>
        </Link>

        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {formatDistanceToNow(new Date(createdAt), { locale: ru })} назад
        </Typography>
        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
          <Tooltip
            componentsProps={tooltipProps}
            title={<Button sx={{ color: "text.primary" }}>Пожаловаться</Button>}
            placement="bottom-end"
            arrow
          >
            <MoreHoriz sx={{ width: 18, height: 18 }} />
          </Tooltip>
        </Box>
      </Box>
      <Box>
        <Link href={`/posts/${postId}`}>
          <Typography
            component="h2"
            sx={{ cursor: "pointer", fontSize: 20, mt: 1, mb: 2 }}
          >
            {title}
          </Typography>
        </Link>
      </Box>
    </>
  );
};
