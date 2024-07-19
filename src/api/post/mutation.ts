import { useMutate } from '../../hooks/react-query/useMutate';
import { TCreatePostSchema } from '../../schemas/post.schema';
import { IPost } from '../../types/models';
import { MutationResult } from '../../types/react-query';
import { service, keys } from './service';
import { keys as userKeys } from '../user/service';

export const useCreatePost = () => {
  return useMutate(service.create, {
    showSuccess: 'Post created successfully',
    showError: true,
    autoRefetch: (data) => [keys.all(), userKeys.profile(data.authorId)],
  }) as MutationResult<IPost, TCreatePostSchema>;
};

export const useDeletePost = () => {
  return useMutate(service.delete, {
    showSuccess: 'Post deleted successfully',
    showError: true,
    autoRefetch: () => [keys.all(), userKeys.profileWithoutUser()],
  }) as MutationResult<void, string>;
};
