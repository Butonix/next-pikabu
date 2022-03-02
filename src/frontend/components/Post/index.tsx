import React from "react";

import { Session } from "next-auth";

import { Box, Collapse, Divider, Paper } from "@mui/material";

import { PostHeader } from "./PostHeader";
import { PostFooter } from "./PostFooter";
import { PostSide } from "./PostSide";
import { Post as PostType } from "@shared/types";
import { TagList } from "@components/Tag";

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const {
    _id,
    author,
    author_id,
    createdAt,
    summary,
    tags,
    title,
    total_comments,
    total_views,
    updatedAt,
    community_id,
    downvotes,
    rating,
    upvotes,
  } = post;
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleState = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Paper variant="outlined" sx={{ position: "relative" }}>
        <PostSide
          post_id={_id}
          rating={rating}
          onToggle={toggleState}
          isOpen={isOpen}
        />
        <Box sx={{ py: 2, px: 3 }} onClick={() => console.log(post)}>
          <PostHeader
            community_id={community_id}
            postId={_id}
            title={title}
            userId={author}
            createdAt={createdAt}
          />

          <Collapse in={isOpen}>
            <Box
              sx={{
                img: {
                  maxWidth: "100%",
                },
              }}
              dangerouslySetInnerHTML={{ __html: post.summary }}
            ></Box>
          </Collapse>
        </Box>
        <TagList tags={tags} />
        <Divider />
        <PostFooter commentsCount={total_comments} viewsCount={total_views} />
      </Paper>
    </>
  );
};

interface PostListProps {
  posts: PostType[];
}
export const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <Paper sx={{ px: 3, py: 2 }} variant="outlined">
        Здесь пока что нет ни одного поста
      </Paper>
    );
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Box>
  );
};
