import { Box, Typography, Divider } from "@mui/material";

import { Comment as CommentType } from "@shared/types";
import React, { useState } from "react";

import { CommentHead } from "./CommentHead";
import { CommentForm } from "./CommentForm";
import { CommentTreeLoading } from "./CommentTreeLoading";

interface CommentProps {
  post_id: string;
  root_comment_id?: string;
  comment: CommentType;
  comments?: CommentType[];
  onFetch?: (id: string) => void;
  update: (id: string | undefined) => void;
}

export const Comment: React.FC<CommentProps> = ({
  post_id,
  comment,
  comments,
  root_comment_id,

  onFetch = () => {},
  update,
}) => {
  const { author, body, _id, rating, createdAt } = comment;
  const [responseOpen, setResponseOpen] = useState(false);
  const [threadOpen, setThreadOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const AddCommentHandler = (id: string | undefined) => {
    setResponseOpen(false);
    setThreadOpen(true);
    update(id);
  };

  const clickHandler = () => {
    setResponseOpen((prev) => !prev);
  };
  const openThreadHandler = async () => {
    setThreadOpen(true);
    setLoading(true);
    await onFetch(root_comment_id as string);
    setLoading(false);
  };

  return (
    <Box>
      <Box onClick={() => console.log(comment)}>
        <CommentHead
          comment_id={_id}
          author={author}
          rating={rating}
          createdAt={createdAt}
        />
        <Box sx={{ py: 1.5 }}>{body}</Box>
        <Box sx={{}}>
          <Typography
            onClick={clickHandler}
            variant="caption"
            sx={{
              color: "success.main",
              transition: (theme) =>
                theme.transitions.create("all", {
                  duration: theme.transitions.duration.standard,
                }),
              cursor: "pointer",
              "&:hover": {
                color: "success.dark",
              },
            }}
          >
            {responseOpen ? "закрыть" : "ответить"}
          </Typography>
        </Box>
        {responseOpen && (
          <CommentForm
            onAdd={AddCommentHandler}
            post_id={post_id}
            outlined
            parent_comment_id={comment._id}
            root_comment_id={root_comment_id}
          />
        )}
      </Box>
      {!!comment.children_count && !threadOpen ? (
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => setThreadOpen(true)}
        >
          <Box
            sx={{
              bgcolor: "success.dark",
              width: 14,
              height: 14,
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            +
          </Box>
          <Typography
            sx={{ pl: 1 }}
            color="text.secondary"
            variant="caption"
            onClick={openThreadHandler}
          >
            раскрыть ветку ({comment.children_count})
          </Typography>
        </Box>
      ) : loading ? (
        <>
          <CommentTreeLoading />
        </>
      ) : (
        comments?.map((com) => {
          return (
            <Box sx={{ display: "flex" }} key={com._id}>
              <Divider
                onClick={() => setThreadOpen(false)}
                orientation="vertical"
                flexItem
                sx={{ cursor: "pointer", mr: 2 }}
              />

              <Comment
                post_id={post_id}
                root_comment_id={root_comment_id}
                update={update}
                comment={com}
                comments={com?.children}
              />
            </Box>
          );
        })
      )}
    </Box>
  );
};
