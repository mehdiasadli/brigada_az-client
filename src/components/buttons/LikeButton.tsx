import { ActionIcon, Anchor, Group } from '@mantine/core';
import { IPost } from '../../types/models';
import { useLikeHandler } from '../../hooks/useLikeHandler';
import { modals } from '@mantine/modals';
import LikeListModal from '../modals/LikeListModal';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface LikeButtonProps {
  post: IPost;
}

const LikeButton = (props: LikeButtonProps) => {
  const { onLike, totalLikes, Icon } = useLikeHandler(props.post.id, props.post.likes);
  const openListModal = () =>
    modals.open({
      title: 'Liked Users',
      children: <LikeListModal postId={props.post.id} />,
    });

  const { pathname } = useLocation();

  useEffect(() => {
    modals.closeAll();
  }, [pathname]);

  return (
    <Group gap={5}>
      <ActionIcon color='red' variant='transparent' onClick={onLike}>
        {<Icon size={16} />}
      </ActionIcon>
      <Anchor size='xs' c='dimmed' onClick={totalLikes === 0 ? () => {} : openListModal}>
        {totalLikes} {totalLikes === 1 ? 'Like' : 'Likes'}
      </Anchor>
    </Group>
  );
};

export default LikeButton;
