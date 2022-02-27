import React from "react";
import Link from "next/link";
import { ChatRounded, Save, Visibility } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";

const tooltipProps = {
  tooltip: {
    sx: {
      bgcolor: "background.paper",
      fontSize: 12,
      p: 2,
      boxShadow: 12,
      color: "text.primary",
    },
  },
  arrow: {
    sx: {
      color: "background.paper",
    },
  },
};

interface PostFooterProps {
  commentsCount: number;
  viewsCount: number;
}

export const PostFooter: React.FC<PostFooterProps> = ({
  commentsCount,
  viewsCount,
}) => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        px: 3,
        py: 1,
        display: "flex",
        alignItems: "center",
        gap: 3,
        color: "text.secondary",
        fontWeight: 400,
        fontSize: "0.875rem",
      }}
    >
      <Link href="/">
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            py: 1,
          }}
          component="a"
        >
          <ChatRounded sx={{ width: 18, height: 18 }} /> {commentsCount}
        </Typography>
      </Link>
      <Tooltip
        componentsProps={tooltipProps}
        title="100 000 просмотров"
        placement="top"
        arrow
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
          }}
        >
          <Visibility sx={{ width: 18, height: 18 }} />
          <Typography variant="body2">{viewsCount}</Typography>
        </Box>
      </Tooltip>

      <Tooltip
        componentsProps={tooltipProps}
        title="сохранило 100 человек"
        placement="top"
        arrow
      >
        <Save sx={{ width: 18, height: 18 }} />
      </Tooltip>
    </Box>
  );
};
