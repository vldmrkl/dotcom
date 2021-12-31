import { footerLinks as links } from '~/pages/data';
import Links from '~/pages/common/Links';

export default function Footer() {
  return (
    <footer className="text-center py-2">
      <Links
        links={links}
        iconSize="2xl"
        containerStyles="justify-center divide-x divide-slate-300"
      />
      <p className="pt-4 px-8">
        © {new Date().getUTCFullYear()} Designed and built by Volodymyr
        Klymenko.
      </p>
    </footer>
  );
}
