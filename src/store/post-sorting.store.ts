import { create } from 'zustand';
import { QueryParams } from '../utils/queryParser';

interface PostSortingState {
  feed: Required<QueryParams['order']>;
  profile: Required<QueryParams['order']>;
}

interface PostSortingActions {
  changeOrder(place: 'feed' | 'profile', order: Required<QueryParams['order']>): void;
}

export const usePostSorting = create<PostSortingActions & PostSortingState>((set) => ({
  feed: {
    by: 'created_at',
    dir: 'desc',
  },
  profile: {
    by: 'created_at',
    dir: 'desc',
  },

  changeOrder(place, order) {
    set((state) => ({ ...state, [place]: order }));
  },
}));
