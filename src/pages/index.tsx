import type { GetServerSideProps, NextPage } from "next";

import { Box, Button } from "@mui/material";
import { Filters } from "@components/Filters";
import { Layout } from "@components/Layout";
import { PostList } from "@components/Post";

import { getPosts } from "@rest/post";
import { Post } from "@shared/types";
import { useSession } from "next-auth/react";

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await getPosts();

  return {
    props: {
      posts: posts,
    },
  };
};
