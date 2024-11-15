import parse from 'html-react-parser';
import Link from 'next/link';
import { data } from '../lib/data';

function Modal({ id }) {
  const item = data.find((obj) => obj.id === id);

  if (!id) {
    return null;
  }

  return (
    <>
      <Link href="/" className="modal-close">
        &times;
      </Link>
      <div className="modal-scrollable-content">
        <>
          <h2>{item.title}</h2>
          <h4>
            {item.authorFull}, {item.book}
          </h4>
          <div>{parse(item.content)}</div>
        </>
      </div>
    </>
  );
}

export default Modal;
