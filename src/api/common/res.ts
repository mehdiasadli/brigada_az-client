import { IPost, IUser } from '../../types/models';

export type SearchResUser = { type: 'USER' } & IUser;
export type SearchResPost = { type: 'POST' } & IPost;

export type CommonSearchRes = SearchResPost | SearchResUser;
