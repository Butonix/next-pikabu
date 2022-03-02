import React from "react";

import { Box, SxProps, Theme, Typography } from "@mui/material";
import Link from "next/link";
import { Tag } from "@shared/types";

interface TagListProps {
  tags: Array<Tag>;
  containerSx?: SxProps<Theme>;
  tagSx?: SxProps<Theme>;
}

export const TagList: React.FC<TagListProps> = ({
  tags,
  containerSx,
  tagSx,
}) => {
  return (
    <Box sx={{ px: 3, pb: 2, display: "flex", gap: 2, ...containerSx }}>
      {tags.map((tag) => (
        // <Link key={tag._id} href="/">
        <Typography
          key={tag._id}
          color="text.secondary"
          variant="body2"
          component="a"
          sx={{
            transition: (theme) =>
              theme.transitions.create("all", {
                duration: theme.transitions.duration.standard,
              }),
            cursor: "pointer",
            "&:hover": {
              color: "text.primary",
            },
          }}
        >
          {tag.name}
        </Typography>
        // </Link>
      ))}
    </Box>
  );
};
