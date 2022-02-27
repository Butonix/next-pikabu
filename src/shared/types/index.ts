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

export interface User extends UserInput {
  _id: string;
  rating?: number;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostInput {
  title: string;
  summary: string;
  tag_ids: Array<string>;
  community_id?: string;
}

export interface Post extends PostInput {
  _id: string;
  author_id: string;
  author: string;
  rating?: number;
  total_comments: number;
  total_views: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityInput {
  name: string;
  summary: string;
  rules?: string;
}

export interface Community extends CommunityInput {
  _id: string;
  admin_id: number;
  total_posts: number;
  total_users: number;
  // user_ids?: Types.Array<Types.ObjectId>;
  // post_ids?: Types.Array<Types.ObjectId>;
  users: Array<User>;
  posts: Array<Post>;
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
  children?: Comment[];
}
