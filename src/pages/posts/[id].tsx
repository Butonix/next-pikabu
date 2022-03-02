import React, { useState } from "react";
import { Stack, Button, Box, Skeleton, Paper } from "@mui/material";
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
  return (
    <Layout>
      <Stack spacing={2}>
        <PostComponent post={post} />

        {post.community_id && (
          <CommentCommunity community_id={post.community_id} />
        )}

        <CommentList post_id={post._id} comments={comments} />
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
