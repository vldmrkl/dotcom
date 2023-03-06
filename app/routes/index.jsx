import { useEffect } from 'react';
import MinimalisticMain from '~/pages/index/MinimalisticMain';
import { SITE_BASE_URL } from '~/utils/constants';

export const meta = () => {
  return {
    title: 'Volodymyr Klymenko',
    description: 'Volodymyr Klymenko, Software Developer in Toronto',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'The personal site of Volodymyr Klymenko',
    'twitter:text:title': 'The personal site of Volodymyr Klymenko',
    'og:title': 'The personal site of Volodymyr Klymenko',
    'og:url': SITE_BASE_URL,
    'og:type': 'website',
    'og:description': 'Volodymyr Klymenko, Software Developer in Toronto',
    'og:image': SITE_BASE_URL + '/img/site-share.png',
  };
};

export default function IndexRoute() {
  useEffect(() => {
    if (window.location.hash) {
      window.history.scrollRestoration = 'manual';
      const elementId = window.location.hash.split('#')[1];
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  });

  return <MinimalisticMain />;
}
