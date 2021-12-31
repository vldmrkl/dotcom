import Card from '~/pages/common/Card';
import { openSourceProjects as projects } from '~/pages/data';

export default function OpenSource() {
  return (
    <section id="open-source" className="my-8">
      <h1 className="font-mono font-medium text-2xl text-center">
        Open-Source Work
      </h1>
      <h2 className="font-mono text-xl text-zinc-400 text-left py-2 w-3/4 sm:w-1/2 mx-auto">
        I truly believe that open-source software (OSS) significantly impacts
        the world in a positive way.
        <br />
        <br />I was introduced to open-source development when I studied at
        Seneca College. Since then, I've contributed to many large and small
        open-source projects. You can learn more about my adventures in the
        world of OSS in{' '}
        <a
          className="text-zinc-800 hover:text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://vldmrkl.com/blog/from-writing-unit-tests-to-working-on-the-software-from-mozilla-microsoft-and-airbnb/"
        >
          one of my blog posts
        </a>
        . Here, you can see some of the projects I contributed to:
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-8 py-8">
        {projects.map((project) => (
          <Card key={project.title} size="sm" {...project} />
        ))}
      </div>
    </section>
  );
}
