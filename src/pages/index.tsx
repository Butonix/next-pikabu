import type { GetServerSideProps, NextPage } from "next";

import { Layout } from "@components/Layout";
import { PostList } from "@components/Post";

import { getPosts } from "@rest/post";
import { Post } from "@shared/types";

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
