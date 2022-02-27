import { CommentInput } from "@shared/types";
import { api } from ".";

export async function addComment(comment: CommentInput) {
  const response = await api.post("/comments", comment);
  console.log(response);
  return response;
}

export async function getCommentsForPost(id: string) {
  const response = await api.get(`/comments/${id}`);
  const comments = response.data;
  console.log(comments);
  return comments;
}
