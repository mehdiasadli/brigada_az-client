import { useLocation } from 'react-router-dom';
import { env } from '../../config/env.config';
import { Helmet } from 'react-helmet-async';

interface OGProps {
  title: string;
  locale?: string;
  type?: string;
  img?: string;
  url?: string;
  desc?: string;
}

const OG = ({ title, locale = 'en_US', type = 'website', url = env.url, img, desc }: OGProps) => {
  const { pathname } = useLocation();

  return (
    <Helmet>
      <meta property='og:title' content={title} />
      <meta property='og:locale' content={locale} />
      <meta property='og:type' content={type} />
      <meta property='og:url' content={url + pathname} />

      {img && <meta property='og:image' content={img} />}
      {desc && <meta property='og:description' content={desc} />}
    </Helmet>
  );
};

export default OG;
