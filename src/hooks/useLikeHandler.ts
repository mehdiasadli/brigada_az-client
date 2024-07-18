import { useState } from 'react';
import { ILike } from '../types/models';
import { useUser } from './useUser';
import { useLike } from '../api/like/mutation';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

export const useLikeHandler = (postId: string, likes: ILike[]) => {
  const { id } = useUser();

  const [totalLikes, setTotalLikes] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.some((like) => like.user.id === id));

  const { mutate, isPending } = useLike();

  const onLike = () => {
    if (isPending) return;

    if (isLiked && totalLikes > 0) {
      setTotalLikes((t) => t - 1);
    } else if (!isLiked) {
      setTotalLikes((t) => t + 1);
    }

    setIsLiked((prev) => !prev);

    mutate(postId, {
      onError() {
        setIsLiked((prev) => !prev);

        if (isLiked && totalLikes > 0) {
          setTotalLikes((t) => t + 1);
        } else if (!isLiked) {
          setTotalLikes((t) => t - 1);
        }
      },
    });
  };

  const Icon = isLiked ? IconHeartFilled : IconHeart;

  return {
    onLike,
    totalLikes,
    Icon,
  };
};
