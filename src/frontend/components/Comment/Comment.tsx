import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  Skeleton,
  Divider,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";

import { DownvoteButton, UpvoteButton } from "@components/Buttons/VoteButtons";
import { Comment as CommentType } from "@shared/types";
import React, { useState } from "react";
import { ru } from "date-fns/locale";
import { CommentHead } from "./CommentHead";
import { CommentForm } from "./CommentForm";

interface CommentProps {
  post_id: string;
  root_comment_id?: string;
  comment: CommentType;
  comments?: CommentType[];
  onFetch?: (id: string) => void;
}

export const Comment: React.FC<CommentProps> = ({
  post_id,
  comment,
  comments,
  root_comment_id,
  onFetch = () => {},
}) => {
  const { author_id, author, body, _id, rating, createdAt } = comment;
  const [responseOpen, setResponseOpen] = useState(false);
  const [threadOpen, setThreadOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const clickHandler = () => {
    setResponseOpen((prev) => !prev);
  };
  const openThreadHandler = async () => {
    onFetch(root_comment_id as string);
  };
  console.log("comment render", body);
  return (
    <Box onClick={() => console.log(comment)}>
      <Box>
        <CommentHead author={author} rating={rating} createdAt={createdAt} />
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
            {comments?.length || 0}
          </Typography>
        </Box>
        {responseOpen && (
          <CommentForm
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
      ) : (
        comments?.map((com, idx) => {
          <Box sx={{ display: "flex" }}>
            <Divider
              onClick={() => setThreadOpen(false)}
              orientation="vertical"
              flexItem
              sx={{ cursor: "pointer", mr: 2 }}
            />

            <Comment
              post_id={post_id}
              root_comment_id={root_comment_id}
              key={com._id}
              comment={com}
              comments={com?.children}
              // comments={
              //   com?.children
              //   // comments?.find((comment) => comment._id === com._id)?.children
              // }
              // comments={comments[idx]?.children}
            />
          </Box>;
        })
      )}
    </Box>
  );
};
