import { Box, Button, Stack, Typography } from "@mui/material";
import { Tag } from "@shared/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CommuntyProps {
  community_id: string;
  image: string;
  title: string;
  total_posts: number;
  total_users: number;
  tags: Tag[];
}

export const CommunityCard: React.FC<CommuntyProps> = ({
  community_id,
  image,
  title,
  total_posts,
  total_users,
  tags,
}) => {
  // const tags = ["Юмор", "Черный юмор", "Животные", "Картинка с текстом"];
  return (
    <Box sx={{ display: "flex", gap: 1, height: 120 }}>
      <img src={image} width={105} height={105} />
      <Stack sx={{ position: "relative" }}>
        <Link href={`/communities/${community_id}`}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "1.125rem",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          постов {total_posts} • подписчиков {total_users}
        </Typography>
        <Box sx={{ mt: 1, display: "flex", gap: 1.5 }}>
          {tags.map((tag) => (
            // <Link key={tag} href="/">
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

        <Button
          size="small"
          sx={{ fontSize: "0.75rem", position: "absolute", bottom: 0 }}
          variant="contained"
        >
          Подписаться
        </Button>
      </Stack>
    </Box>
  );
};
