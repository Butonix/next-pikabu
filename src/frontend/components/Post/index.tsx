import React from "react";
import Link from "next/link";

import { Box, Collapse, Divider, Paper, Typography } from "@mui/material";

import { PostHeader } from "./PostHeader";
import { PostFooter } from "./PostFooter";
import { Post as PostType, PostInput } from "@shared/types";
import { PostSide } from "./PostSide";
import { formatDistance, formatDistanceToNow, subDays } from "date-fns";

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleState = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Paper variant="outlined" sx={{ position: "relative" }}>
        <PostSide
          ratingCount={post.rating || 0}
          onToggle={toggleState}
          isOpen={isOpen}
        />
        <Box sx={{ py: 2, px: 3 }} onClick={() => console.log()}>
          <PostHeader
            postId={post._id}
            title={post.title}
            userId={post.author}
            createdAt={post.createdAt}
          />

          <Collapse in={isOpen}>
            {/* <Typography>{post.summary}</Typography> */}
            <Box
              sx={{
                // overflow: "hidden",

                img: {
                  maxWidth: "100%",
                },
              }}
              dangerouslySetInnerHTML={{ __html: post.summary }}
            ></Box>
          </Collapse>
        </Box>
        <Box sx={{ px: 3, pb: 2, display: "flex", gap: 2 }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, ab?
          {/* {tags.map((tag) => (
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
          ))} */}
        </Box>
        <Divider />
        <PostFooter commentsCount={0} viewsCount={0} />
      </Paper>
    </>
  );
};
