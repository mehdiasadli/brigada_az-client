import { Helmet } from 'react-helmet-async';

const MetaTitle = ({ title = 'Brigada' }: { title?: string }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaTitle;
