import Link from 'next/link';

function Cards({ filteredArr, showCards }) {
  return (
    <>
      <div className={`cards ${!showCards ? 'cardsHidden' : ''}`}>
        {filteredArr.map((obj) => (
          <Link
            scroll={false}
            href={`/${obj.id}`}
            className="card card__title"
            key={obj.id}
          >
            <p>{obj.title}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Cards;
