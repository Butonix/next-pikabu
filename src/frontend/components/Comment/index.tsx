import React, { useState } from "react";
import { Box, Divider, Paper } from "@mui/material";

import { Comment } from "./Comment";
import { Comment as CommentType } from "@shared/types";
import { CommentForm } from "./CommentForm";
import axios from "axios";

interface CommentListProps {
  post_id: string;
  comments: Array<CommentType>;
}

export const CommentList: React.FC<CommentListProps> = ({
  post_id,
  comments,
}) => {
  // const rcomms = comments.filter(
  //   (comm) => comm.parent_comment_id === undefined
  // );
  const [commentList, setCommentList] = useState(comments);
  const fetchTree = async (id: string) => {
    // const tree: CommentType[] = await axios
    //   .get(`http://localhost:3000/api/comments/tree/${id}`)
    //   .then((res) => res.data);

    // console.log(tree);
    // console.log(tree[0], "res");
    // const newState = [...rootComments].map((rc, idx) =>
    //   rc._id === tree[0]._id ? tree[0] : rc
    // );
    // setRootComments(newState);
    setCommentList([
      {
        author: "vasya21",
        author_id: "6210d69c334a128baec32acd",
        body: "Comment to post australia",
        createdAt: "2022-02-26T13:27:56.187Z",
        post_id: "6210bc37334a128baec32ac8",
        rating: 0,
        updatedAt: "2022-02-26T13:27:56.187Z",

        _id: "621a2adc8d3e383142803ec2",
      },
      {
        author: "vasya222",
        author_id: "6210d69c334a128baec32acd",
        body: "Comment to post australia",
        createdAt: "2022-02-26T13:27:56.187Z",
        post_id: "6210bc37334a128baec32ac8",
        rating: 0,
        updatedAt: "2022-02-26T13:27:56.187Z",

        _id: "621a2adc8d3e383142803ec9",
      },
      {
        _id: "621a2ceb8d3e383142803ed7",
        author_id: "6210d69c334a128baec32acd",
        author: "vasya222",
        post_id: "6210bc37334a128baec32ac8",
        body: "root comment",
        rating: 0,
        createdAt: "2022-02-26T13:36:43.069Z",
        updatedAt: "2022-02-26T13:36:43.069Z",

        children_count: 3,
        children: [
          {
            _id: "621b3b191ad81db4a9072297",
            author_id: "6210d69c334a128baec32acd",
            author: "vasya222",
            post_id: "6210bc37334a128baec32ac8",
            body: 'first children of "root comment"',
            rating: 0,
            children_count: 0,
            parent_comment_id: "621a2ceb8d3e383142803ed7",
            root_comment_id: "621a2ceb8d3e383142803ed7",
            createdAt: "2022-02-27T08:49:29.395Z",
            updatedAt: "2022-02-27T08:49:29.395Z",

            children: [],
          },
          {
            _id: "621b3b1d1ad81db4a907229a",
            author_id: "6210d69c334a128baec32acd",
            author: "vasya222",
            post_id: "6210bc37334a128baec32ac8",
            body: 'second children of "root comment"',
            rating: 0,
            children_count: 1,
            parent_comment_id: "621a2ceb8d3e383142803ed7",
            root_comment_id: "621a2ceb8d3e383142803ed7",
            createdAt: "2022-02-27T08:49:33.857Z",
            updatedAt: "2022-02-27T08:49:33.857Z",

            children: [
              {
                _id: "621b3b441ad81db4a90722a0",
                author_id: "6210d69c334a128baec32acd",
                author: "vasya222",
                post_id: "6210bc37334a128baec32ac8",
                body: 'first children of "second children of "root comment" "',
                rating: 0,
                children_count: 0,
                parent_comment_id: "621b3b1d1ad81db4a907229a",
                root_comment_id: "621a2ceb8d3e383142803ed7",
                createdAt: "2022-02-27T08:50:12.025Z",
                updatedAt: "2022-02-27T08:50:12.025Z",

                children: [],
              },
            ],
          },
        ],
      },
    ]);
  };
  console.log(commentList, "rc");
  return (
    <Paper variant="outlined">
      <Box
        // onClick={() => console.log(rootComments, "rootc")}
        sx={{ px: 3, py: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {commentList?.map((com, idx) => (
          <Comment
            key={com._id}
            comment={commentList[idx]}
            // comment={com}
            post_id={post_id}
            root_comment_id={com._id}
            comments={com?.children}
            // comments={rootComments[idx]?.children}
            onFetch={fetchTree}
          />
        ))}
      </Box>
      <Divider />
      <CommentForm post_id={post_id} />
    </Paper>
  );
};
