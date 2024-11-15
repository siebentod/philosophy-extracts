import Link from 'next/link';
import parse from 'html-react-parser';

import { data } from '../lib/data';

function Display({ id }) {
  const item = data.find((obj) => obj.id === id);

  if (!id) {
    return null;
  }

  return (
    <>
      <div className="modal-content">
        <Link className="modal-close" href="/">
          &times;
        </Link>
        <div className="modal-scrollable-content">
          <h2>{item.title}</h2>
          <p>{parse(item.hymn)}</p>
        </div>
      </div>
    </>
  );
}

export default Display;
