import { Role } from './enums';

type Prisma<U extends boolean = true> = {
  id: string;
} & Time<U>;

type Time<U extends boolean = true> = U extends true
  ? { created_at: Date; updated_at: Date }
  : { created_at: Date };

export type IUser = {
  bio?: string;
  date_of_birth: Date;

  likes: ILike[];
  comments: IComment[];
  posts: IPost[];
  events: any[];
  polls: any[];
  followed_by: IFollowship[];
  following: IFollowship[];
  played: IPlayer[];
  mentioned: IMention[];
  mentioner: IMention[];
} & IPublicUser;

export type IPublicUser = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar?: string;
  roles: Role[];
} & Prisma;

export type IGame = {
  starts_at: Date;
  ending_at?: Date;
  location: string;
  info?: string;
  result: [number, number];
  is_finished: boolean;
  gallery: string[];
  authorId: string;

  author: IUser;
  players: IPlayer[];
} & Prisma;

export type IPlayer = {
  is_capitan: boolean;
  team: string;
  goals: number;
  first_name: string;
  last_name?: string;
  userId?: string;
  gameId: string;

  user?: IUser;
  game: IGame;
} & Prisma;

export type IFollowship = {
  followerId: string;
  followingId: string;

  follower: IUser;
  following: IUser;
} & Prisma<false>;

export type IPost = {
  content: string;
  image?: string;
  authorId: string;

  likes: ILike[];
  comments: IComment[];
  author: IUser;
  mentions: IMention[];
} & Prisma;

export type ILike = {
  userId: string;
  postId: string;

  user: IUser;
} & Prisma<false>;

export type IMention = {
  mentionerId: string;
  mentionedId: string;
  postId: string;

  mentioned: IUser;
  mentioner: IUser;
  post: IPost;
} & Prisma<false>;

export type IComment = {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;

  author: IUser;
  post: IPost;
  parent?: IComment;
  replies: IComment[];
} & Prisma;

export type IProfile = IUser & {
  _count: {
    posts: number;
    followed_by: number;
    following: number;
    events: number;
    polls: number;
    games: number;
    comments: number;
    likes: number;
  };
};
