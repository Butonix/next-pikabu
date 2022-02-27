import React, { useState } from "react";
import { Box, Button, Divider, Input } from "@mui/material";
import { addComment } from "@rest/comment";
import { CommentInput } from "@shared/types";

interface CommentFormProps {
  post_id: string;
  parent_comment_id?: string;
  root_comment_id?: string;
  outlined?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  post_id,
  parent_comment_id,
  root_comment_id,
  outlined = false,
}) => {
  const [body, setBody] = useState("");
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment: CommentInput = {
      post_id,
      parent_comment_id,
      root_comment_id,
      body,
    };
    addComment(comment);
    // console.log(comment);
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
        <Button type="submit" size="small" variant="contained">
          Отправить
        </Button>
      </Box>
    </Box>
  );
};
