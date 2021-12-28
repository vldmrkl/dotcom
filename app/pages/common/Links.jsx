export default function Links(props) {
  const { links, iconSize, containerStyles } = props;
  return (
    <ul className={`flex flex-row ${containerStyles}`}>
      {links.map((link) => (
        <li
          key={link.iconClassName}
          className={`text-${iconSize} hover:text-blue-500 px-2`}
        >
          <a
            role="button"
            aria-label={link.ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
            href={link.url}
            className={`fa ${link.iconClassName}`}
          ></a>
        </li>
      ))}
    </ul>
  );
}
