import { experiences } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="my-8">
      <h1 className="font-mono font-medium text-2xl text-center">Experience</h1>
      <div className="divide-y divide-gray-200">
        {experiences.map((experience) => (
          <div
            key={experience.timeline}
            className="flex flex-row justify-center items-center py-8 mx-auto max-w-2xl"
          >
            <img
              src={experience.logoUrl}
              className="rounded-full w-32 h-32 object-cover"
            />
            <div className="w-2/5 pl-4">
              <h3 className="font-semibold text-base text-left">
                {experience.company}
              </h3>
              <h3 className="font-medium text-base text-left">
                {experience.title}
              </h3>
              <h3 className="font-normal text-base text-left">
                {experience.location}
              </h3>
              <h3 className="font-normal text-base text-left">
                {experience.timeline}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
