import { Helmet } from 'react-helmet-async';

export default function MetaTitle({ title = 'Brigada' }: { title?: string }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
