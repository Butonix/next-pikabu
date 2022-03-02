import { Post, UserInput } from "@shared/types";
import { api } from ".";

export async function registerUser(user: UserInput) {
  const response = await api.post("/auth/signup", user);
  return response;
}

export async function getUserByName(name: string) {
  const response = await api.get(`/user/name/${name}`);
  return response.data;
}

export async function getUserPosts(id: string) {
  const response = await api.get<Post>(`/posts/user/${id}`);
  return response.data;
}

export async function getUserPostsByName(username: string) {
  const response = await api.get<Post>(`/posts/username/${username}`);
  return response.data;
}
