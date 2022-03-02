import { FollowPayload } from "@shared/types";
import { api } from ".";

export async function followUser(userId: string, payload: FollowPayload) {
  const response = await api.post(`/follow/user/${userId}`, payload);
  return response.data;
}

export async function followCommunity(
  communityId: string,
  payload: FollowPayload
) {
  const response = await api.post(`/follow/community/${communityId}`, payload);
  return response.data;
}
