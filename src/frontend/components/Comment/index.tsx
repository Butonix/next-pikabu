import React, { useState } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";

import { Comment } from "./Comment";
import { Comment as CommentType } from "@shared/types";
import { CommentForm } from "./CommentForm";

import { getCommentsForPost, getTreeOfComments } from "@rest/comment";

interface CommentListProps {
  post_id: string;
  comments: Array<CommentType>;
}

export const CommentList: React.FC<CommentListProps> = ({
  post_id,
  comments,
}) => {
  const [commentList, setCommentList] = useState(comments);
  const fetchTree = async (id: string) => {
    const tree = await getTreeOfComments(id);
    const newState = [...commentList].map((com, idx) =>
      com._id === tree._id ? tree : com
    );
    setCommentList(newState);
  };
  const update = async (id: string | undefined) => {
    /**updates tree when invoked (fetches new tree for root_comment or refetches root comments) */
    if (!id) {
      const updatedComments = await getCommentsForPost(post_id);
      setCommentList(updatedComments);
      return;
    }
    fetchTree(id);
  };

  return (
    <Paper variant="outlined">
      <Box
        sx={{ px: 3, py: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {commentList.length === 0 && (
          <Typography>Комментариев еще нет. </Typography>
        )}
        {commentList?.map((com) => (
          <Comment
            key={com._id}
            comment={com}
            post_id={post_id}
            root_comment_id={com._id}
            comments={com?.children}
            onFetch={fetchTree}
            update={update}
          />
        ))}
      </Box>
      <Divider />
      <CommentForm post_id={post_id} onAdd={update} />
    </Paper>
  );
};
