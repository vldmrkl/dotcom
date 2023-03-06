import { Link } from 'remix';

const links = [
  {
    url: 'https://www.github.com/vldmrkl/',
    title: 'GitHub',
  },
  {
    url: 'https://www.linkedin.com/in/volodymyr-klymenko/',
    title: 'LinkedIn',
  },
  {
    url: 'https://medium.com/@volodymyrklymenko',
    title: 'Medium',
  },
  {
    url: 'https://twitter.com/volodymyr_ca',
    title: 'Twitter',
  },
];

export default function MinimalisticMain() {
  return (
    <section className="mb-8 h-full">
      <h1 className="font-mono font-medium text-3xl text-center">
        Volodymyr Klymenko
      </h1>

      <ul className="mt-2 flex flex-col md:flex-row justify-center items-center md:space-x-2">
        {links.map((link) => (
          <li>
            <a
              className="font-medium hover:text-blue-500 text-3xl lg:text-base"
              role="button"
              target="_blank"
              rel="noopener noreferrer"
              href={link.url}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
