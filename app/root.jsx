import { Meta, LiveReload, Links, Scripts, Outlet } from 'remix';
import Header from '~/pages/common/Header';
import Footer from '~/pages/common/Footer';
import styles from './tailwind.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/favicon-32x32.png"
          sizes="32x32"
        />
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <Links />
      </head>
      <body className="bg-gray-50 mt-64 lg:mt-0">
        <main className="max-w-6xl mx-auto my-8">
          <Outlet />
        </main>
        <Scripts />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  );
}
