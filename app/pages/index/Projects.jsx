import Card from '~/pages/common/Card';
import { projects } from '~/pages/data';

export default function Projects() {
  return (
    <section id="projects" className="my-8">
      <h1 className="font-mono font-medium text-2xl text-center">Projects</h1>
      <div className="flex flex-row flex-wrap justify-center gap-8 py-8">
        {projects.map((project) => (
          <Card key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
