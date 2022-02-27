import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CommuntyProps {
  image: string;
  title: string;
  postCount: number;
  subCount: number;
}

export const CommunityCard: React.FC<CommuntyProps> = ({
  image,
  title,
  postCount,
  subCount,
}) => {
  const tags = ["Юмор", "Черный юмор", "Животные", "Картинка с текстом"];
  return (
    <Box sx={{ display: "flex", gap: 1, height: 120 }}>
      <img src={image} width={105} height={105} />
      <Stack sx={{ position: "relative" }}>
        <Typography variant="subtitle1" sx={{ fontSize: "1.125rem" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          постов {postCount} • подписчиков {subCount}
        </Typography>
        <Box sx={{ mt: 1, display: "flex", gap: 1.5 }}>
          {tags.map((tag) => (
            <Link key={tag} href="/">
              <Typography
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
                {tag}
              </Typography>
            </Link>
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
