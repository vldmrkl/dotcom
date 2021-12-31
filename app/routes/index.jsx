import { useEffect } from 'react';
import Intro from '~/pages/index/Intro';
import Experience from '~/pages/index/Experience';
import Projects from '~/pages/index/Projects';
import OpenSource from '~/pages/index/OpenSource';

export const meta = () => {
  return {
    title: 'Volodymyr Klymenko',
    description: 'Volodymyr Klymenko, Software Developer in Toronto.',
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

  return (
    <>
      <Intro />
      <Experience />
      <Projects />
      <OpenSource />
    </>
  );
}
