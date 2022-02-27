import React, { useState } from "react";
import { Stack, Button } from "@mui/material";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps, NextPage } from "next";

import { Layout } from "@components/Layout";
import { CommentList } from "@components/Comment";
import { Post as PostComponent } from "@components/Post";
import { CommentCommunity } from "@components/Comment/CommentCommunity";
import { getPostById } from "@rest/post";
import { getCommentsForPost } from "@rest/comment";
import { Comment, Post } from "@shared/types";

interface PostPageProps {
  post: Post;
  comments: Comment[];
}

const PostPage: NextPage<PostPageProps> = ({ post, comments }) => {
  const [commentList, setCommentList] = useState(comments);
  const clickHandler = () => {
    setCommentList((prev) => [
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
  return (
    <Layout>
      <Stack spacing={2} onClick={() => console.log(commentList)}>
        <PostComponent post={post} />
        <CommentCommunity
          image="https://picsum.photos/100/100"
          name="Reddit"
          total_posts={3}
          total_users={10}
        />
        <Button onClick={clickHandler}>Fetch</Button>
        <CommentList post_id={post._id} comments={commentList} />
      </Stack>
    </Layout>
  );
};

export default PostPage;

interface PostPageParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as PostPageParams;
  const post = await getPostById(id);
  const comments = await getCommentsForPost(id);
  return {
    props: {
      post: post,
      comments: comments,
    },
  };
};
