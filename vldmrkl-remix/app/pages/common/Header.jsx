import { headerLinks as links } from '~/pages/data';

export default function Header() {
  return (
    <header
      className="px-4 py-2
        backdrop-blur-lg backdrop-saturate-150
        border-b-2 border-gray-300"
    >
      <nav className="flex items-center justify-between flex-wrap">
        <a
          className="text-lg font-mono font-medium hover:text-blue-500"
          href="https://vldmrkl.com"
        >
          vldmrkl.com
        </a>

        <ul className="hidden sm:flex flex-col sm:flex-row ml-auto">
          {links.map((link) => (
            <li key={link.title}>
              <a
                className="px-2 text-base font-mono text-gray-500 hover:text-gray-600"
                href={link.url}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
