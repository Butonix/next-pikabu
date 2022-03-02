import {
  Comment,
  CommentInput,
  VoteCommentBody,
  VotePayload,
} from "@shared/types";
import { api } from ".";

export async function addComment(comment: CommentInput) {
  const response = await api.post<Comment>("/comments", comment);
  const createdComment = response.data;

  return createdComment;
}

export async function getCommentsForPost(id: string) {
  const response = await api.get(`/comments/post/${id}`);
  const comments = response.data;
  return comments;
}

export async function getTreeOfComments(id: string) {
  const response = await api.get(`/comments/${id}`);
  /**returns array of 1 comment with field "children" of type comment[] */
  const comments: Comment = response.data[0];
  return comments;
}

export async function voteComment(id: string, vote: VotePayload) {
  const response = await api.post(`/vote/comments/${id}`, vote);
  return response;
}
