import type { GetServerSideProps, NextPage } from "next";

import { Box, Button } from "@mui/material";
import { Filters } from "@components/Filters";
import { Layout } from "@components/Layout";
import { Post as PostComponent } from "@components/Post";

import { getPosts } from "@rest/post";
import { Post } from "@shared/types";

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const clickHandler = async () => {
    const res = await getPosts();
    console.log(res);
  };
  return (
    <Layout>
      <Filters />
      <Button onClick={clickHandler}>fetchPostsAndLog</Button>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {posts?.map((post) => (
          <PostComponent key={post._id} post={post} />
        ))}
      </Box>
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
