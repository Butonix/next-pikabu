import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";

import { Layout } from "@components/Layout";
import { Box, Button, Avatar, Stack } from "@mui/material";

import { SectionHeader } from "@components/SectionHeader";
import { PostList } from "@components/Post";
import { getCommunityInfo, getCommunityPosts } from "@rest/community";
import { Community, Post } from "@shared/types";

import { SidebarCommentPage } from "@components/Sidebar/SidebarCommentPage";
import {
  CommunityFollowButton,
  UserFollowButton,
} from "@components/FollowButton";

interface CommunityPageProps {
  community: Community;
  posts: Post[];
}
const CommunityPage: NextPage<CommunityPageProps> = ({ posts, community }) => {
  // const { total_posts, total_users, name, rules } = community;

  return (
    <Layout
      sidebarSlot={
        <SidebarCommentPage
          author_id={community.author_id}
          author={community.author}
          rules={community.rules}
          summary={community.summary}
        />
      }
    >
      <Stack spacing={2}>
        <SectionHeader
          name={community?.name}
          bgimage="https://picsum.photos/200/200"
          avatar={<Avatar sx={{ width: 128, height: 128 }}>A</Avatar>}
          actions={
            <CommunityFollowButton
              communityId={community._id}
              onUnauthAction={() => {
                console.log("auth");
              }}
            />
          }
        >
          <Stack spacing={3}>
            <Box sx={{ display: "flex" }}>
              постов {community?.total_posts} • подписчиков{" "}
              {community?.total_followers}
            </Box>
          </Stack>
        </SectionHeader>

        <PostList posts={posts} />
      </Stack>
    </Layout>
  );
};

export default CommunityPage;

interface PostPageParams extends ParsedUrlQuery {
  communityId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { communityId } = context.params as PostPageParams;
  const community = await getCommunityInfo(communityId);
  const communityPosts = await getCommunityPosts(communityId);
  return {
    props: {
      community: community,
      posts: communityPosts,
    },
  };
};
