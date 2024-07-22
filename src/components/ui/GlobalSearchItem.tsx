import { CommonSearchRes } from '../../api/common/res';
import SearchPostItem from './SearchPostItem';
import SearchUserItem from './SearchUserItem';

interface GlobalSearchItemProps {
  item: CommonSearchRes;
  query: string;
}

export default function GlobalSearchItem({ item, query }: GlobalSearchItemProps) {
  return item.type === 'POST' ? (
    <SearchPostItem item={item} query={query} />
  ) : (
    <SearchUserItem item={item} query={query} />
  );
}
