import React, { useState } from "react";
import { Box, Button, Divider, Input } from "@mui/material";
import { addComment } from "@rest/comment";
import { CommentInput, Comment } from "@shared/types";
import { LoadingButton } from "@mui/lab";

interface CommentFormProps {
  post_id: string;
  parent_comment_id?: string;
  root_comment_id?: string;
  outlined?: boolean;

  onAdd: (id: string | undefined) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  post_id,
  parent_comment_id,
  root_comment_id,
  outlined = false,

  onAdd,
}) => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const comment: CommentInput = {
      post_id,
      parent_comment_id,
      root_comment_id,
      body,
    };
    addComment(comment).then((res) => {
      setLoading(false);
      onAdd(root_comment_id);
    });
    setBody("");
  };
  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={outlined ? { border: 1, borderColor: "divider" } : {}}
    >
      <Input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        fullWidth
        placeholder="Введите текст комментария"
        multiline
        disableUnderline
        sx={{ mx: 3, my: 2 }}
      />
      <Divider />
      <Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: "background.default",
          display: "flex",
        }}
      >
        <LoadingButton
          loading={loading}
          type="submit"
          size="small"
          variant="contained"
        >
          Отправить
        </LoadingButton>
      </Box>
    </Box>
  );
};
