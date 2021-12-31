import { Link } from 'remix';
import { headerLinks as links } from '~/pages/data';

export default function Header() {
  return (
    <header className="px-4 py-4">
      <nav className="flex items-center justify-between flex-wrap">
        <Link
          className="text-lg font-mono font-medium hover:text-blue-500"
          to={'/'}
        >
          vldmrkl.com
        </Link>
        <ul className="sm:flex sm:flex-row ml-auto">
          {links.map((link) => {
            // hide home page scrolling links on small devices
            const displayCss = `${
              link.url.includes('#') ? 'hidden' : 'inline'
            } sm:inline`;
            return (
              <li
                className={`${displayCss} px-2 text-base font-mono text-gray-500 hover:text-gray-600 cursor-pointer`}
                key={link.title}
              >
                <Link to={link.url}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
