import { Types } from "mongoose";
export interface VotePostDocument {
  post_id: Types.ObjectId;
  value: 0 | 1 | -1;
}

export interface VoteCommentDocument {
  comment_id: Types.ObjectId;
  value: 0 | 1 | -1;
}

export interface UserDocument {
  email: string;
  password: string;
  name: string;
  rating?: number;
  follower_count?: number;
  avatar?: string;
  rated_posts?: Types.Array<VotePostDocument>;
  rated_comments?: Types.Array<VoteCommentDocument>;
  followed_people_ids?: Types.Array<Types.ObjectId>;
  followed_community_ids?: Types.Array<Types.ObjectId>;
}

export interface PostDocument {
  author_id: Types.ObjectId;
  author: string;
  title: string;
  summary: string;
  rating?: number;
  upvotes?: number;
  downvotes?: number;
  // comment_count: number;
  total_comments?: number;
  // view_count: number;
  total_views?: number;

  tags?: Types.Array<TagDocument>;
  community_id?: Types.ObjectId;
  // upvoted_by?: Types.Array<Types.ObjectId>;
  // downvoted_by?: Types.Array<Types.ObjectId>;
}

export interface CommunityDocument {
  author_id: Types.ObjectId;
  author: string;
  admin_ids: Types.Array<Types.ObjectId>;
  name: string;
  summary: string;
  total_posts?: number;
  total_followers?: number;
  // user_ids?: Types.Array<Types.ObjectId>;
  // post_ids?: Types.Array<Types.ObjectId>;
  tags?: Types.Array<TagDocument>;
  rules?: string;
}

export interface CommentDocument {
  author_id: Types.ObjectId;
  author: string;
  post_id: Types.ObjectId;
  body: string;
  rating: number;
  upvotes?: number;
  downvotes?: number;
  parent_comment_id?: Types.ObjectId;
  root_comment_id?: Types.ObjectId;
  children_count?: number;
  // upvoted_by?: Types.Array<Types.ObjectId>;
  // downvoted_by?: Types.Array<Types.ObjectId>;
}

export interface TagDocument {
  name: string;
}
