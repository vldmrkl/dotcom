import Header from '~/pages/common/Header';
import Footer from '~/pages/common/Footer';
import Intro from '~/pages/index/Intro';
import Experience from '~/pages/index/Experience';
import Projects from '~/pages/index/Projects';
import OpenSource from '~/pages/index/OpenSource';

export default function IndexRoute() {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <Intro />
        <Experience />
        <Projects />
        <OpenSource />
      </main>
      <Footer />
    </>
  );
}
