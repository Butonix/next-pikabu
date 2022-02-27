import { Types } from "mongoose";

export interface UserDocument {
  email: string;
  password: string;
  name?: string;
  rating?: number;
  avatar?: string;
  // posts?: Types.Ar
}

export interface PostDocument {
  author_id: Types.ObjectId;
  author: string;
  title: string;
  summary: string;
  rating: number;
  // comment_count: number;
  total_comments: number;
  // view_count: number;
  total_views: number;

  tag_ids?: Types.Array<Types.ObjectId>;
  community_id?: Types.ObjectId;
}

export interface CommunityDocument {
  admin_id: Types.ObjectId;
  name: string;
  summary: string;
  total_posts: number;
  total_users: number;
  // user_ids?: Types.Array<Types.ObjectId>;
  // post_ids?: Types.Array<Types.ObjectId>;
  rules?: string;
}

export interface CommentDocument {
  author_id: Types.ObjectId;
  author: string;
  post_id: Types.ObjectId;
  body: string;
  rating: number;
  parent_comment_id?: Types.ObjectId;
  root_comment_id?: Types.ObjectId;
  children_count?: number;
}
