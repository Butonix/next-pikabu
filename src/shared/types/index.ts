import { Types } from "mongoose";

export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

export interface AuthInput {
  email: string;
  password: string;
}

export interface UserInput {
  email: string;
  name?: string;
  password: string;
}

// FIXME:
// make types for followed

interface RatedCommentType {
  comment_id: string;
  value: -1 | 1;
  _id: string;
}
interface RatedPostType {
  post_id: string;
  value: -1 | 1;
  _id: string;
}
export interface User {
  email: string;
  name: string;
  _id: string;
  rating?: number;
  follower_count?: number;
  avatar?: string;
  rated_comments?: Array<RatedCommentType>;
  rated_posts?: Array<RatedPostType>;
  followed_people_ids?: Array<string>;
  followed_community_ids?: Array<string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tag {
  _id: string;
  name: string;
}

export interface PostInput {
  title: string;
  summary: string;
  tags: Array<Tag>;
  community_id?: string;
}

export interface Post extends PostInput {
  _id: string;
  author_id: string;
  author: string;
  rating: number;
  total_comments: number;
  total_views: number;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  downvotes: number;
}

export interface CommunityInput {
  name: string;
  summary: string;
  rules?: string;
  tags: Array<Tag>;
}

export interface Community extends CommunityInput {
  _id: string;
  author_id: string;
  author: string;
  admin_ids: Array<number>;
  total_posts: number;
  total_followers: number;
  // users: Array<User>;
  // posts: Array<Post>;
}

export interface CommentInput {
  post_id: string;
  body: string;
  parent_comment_id?: string;
  root_comment_id?: string;
}

export interface Comment extends CommentInput {
  _id: string;
  author_id: string;
  author: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  children_count?: number;
  children?: Array<Comment>;
  upvotes: number;
  downvotes: number;
}

export interface VoteCommentBody {
  comment_id: string;
  vote: 1 | 0 | -1;
}
export interface VotePostBody {
  post_id: string;
  vote: 1 | -1;
}

export interface VotePayload {
  vote: 1 | -1;
}
export interface FollowPayload {
  value: 1 | -1;
}
