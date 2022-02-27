import { PostInput } from "@shared/types";

import { api } from "./index";

export async function getPosts() {
  const response = await api.get("/posts");
  // console.log(response);
  const posts = response.data;
  return posts;
}

export async function getPostById(id: string) {
  const response = await api.get(`/posts/${id}`);
  // console.log(response);
  const post = response.data;
  return post;
}

export async function addPost(post: PostInput) {
  const response = await api.post("/posts", post);

  console.log(response, "from /api/post folder");

  return response;
}
