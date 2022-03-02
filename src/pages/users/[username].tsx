import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";

import { formatDuration, intervalToDuration } from "date-fns";
import { ru } from "date-fns/locale";

import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Layout } from "@components/Layout";
import { PostList } from "@components/Post";
import { SectionHeader } from "@components/SectionHeader";
import { getUserByName, getUserPostsByName } from "@rest/user";
import { Post, User } from "@shared/types";

interface UserPageProps {
  user: User;
  posts: Post[];
}

const UserPage: NextPage<UserPageProps> = ({ user, posts }) => {
  const createdAt = "2021-01-24T17:36:22.898+00:00";
  return (
    <Layout>
      <Stack spacing={4}>
        <SectionHeader
          bgimage="https://picsum.photos/200/200"
          name={user.name}
          avatar={<Avatar sx={{ width: 128, height: 128 }}>A</Avatar>}
          actions={
            <Button
              variant="contained"
              onClick={() => console.log(user, posts)}
            >
              Подписаться
            </Button>
          }
        >
          <Stack spacing={3}>
            <Typography>
              Пикабушник уже{" "}
              {formatDuration(
                intervalToDuration({
                  start: new Date(createdAt),
                  end: new Date(),
                }),
                { locale: ru, format: ["years", "months", "weeks", "days"] }
              )}
            </Typography>
            <Divider />

            <Box sx={{ display: "flex", gap: 5 }}>
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                  {user.rating}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  рейтинг
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </SectionHeader>

        <PostList posts={posts} />
      </Stack>
    </Layout>
  );
};

export default UserPage;

interface UserPageParams extends ParsedUrlQuery {
  username: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as UserPageParams;
  const user = await getUserByName(username);
  const userPosts = await getUserPostsByName(username);
  return {
    props: {
      user: user,
      posts: userPosts,
    },
  };
};
