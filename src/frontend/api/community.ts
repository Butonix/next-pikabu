import { Community, CommunityInput, Post } from "@shared/types";

import { api } from "./index";

export async function getCommunities() {
  const response = await api.get<Community[]>("/communities");
  const communities = response.data;
  return communities;
}

export async function getCommunityInfo(id: string) {
  const response = await api.get<Community>(`/communities/${id}`);
  const community = response.data;
  return community;
}

export async function addCommunity(community: CommunityInput) {
  const response = await api.post<Community>("/communities", community);
  const createdCommunity = response.data;
  return createdCommunity;
}

export async function getCommunityPosts(communityId: string) {
  const response = await api.get<Post[]>(`/posts/community/${communityId}`);
  const posts = response.data;
  return posts;
}
