import { CommunityInput } from "@shared/types";

import { api } from "./index";

export async function getCommunities() {
  const response = await api.get("/communities");
  const communities = response.data;
  return communities;
}

export async function addCommunity(community: CommunityInput) {
  const response = await api.post("/communities", community);
  const createdCommunity = response.data;
  return createdCommunity;
}
