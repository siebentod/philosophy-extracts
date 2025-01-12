import Link from 'next/link';
import { FaGithub, FaHome, FaInfo } from 'react-icons/fa';

function LinksIcons({
  color = 'text-white',
  pos = 'top-2 right-3',
  noabout = false,
  home = false,
}) {
  return (
    <div className={`fixed ${pos} ${color} flex gap-1 icons`}>
      {home ? (
        <Link href="/">
          <FaHome />
        </Link>
      ) : null}
      {noabout ? null : (
        <Link href="/about">
          <FaInfo />
        </Link>
      )}
      <a href="https://github.com/siebentod/">
        <FaGithub />
      </a>
    </div>
  );
}

export default LinksIcons;
