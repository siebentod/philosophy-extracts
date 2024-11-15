'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function Table({ filteredArr, handleCardAuthor }) {
  const [visibleCards, setVisibleCards] = useState([]);
  const [loadCount, setLoadCount] = useState(50);
  const { ref, inView } = useInView();

  useEffect(() => {
    setVisibleCards(filteredArr.slice(0, loadCount));
  }, [filteredArr, loadCount]);

  // Подгружаем новую партию при скролле
  useEffect(() => {
    if (inView && loadCount < filteredArr.length) {
      const nextLoadCount = loadCount + 20;
      setVisibleCards(filteredArr.slice(0, nextLoadCount));
      setLoadCount(nextLoadCount);
    }
  }, [filteredArr, inView, loadCount]);

  return (
    <>
      <main>
        <div className="grid">
          {visibleCards.map((obj) => (
            <React.Fragment key={obj.id}>
              <Link className="card__part card__title" href={`/text/${obj.id}`}>
                {obj.title}
              </Link>
              <div className="card__part card__bookAndAuthor">
                <span className="card__bookAndAuthor__book" title={obj.book}>
                  {obj.book}
                </span>
                <span
                  className="card__bookAndAuthor__author"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCardAuthor(e, obj);
                  }}
                >
                  {obj.author}
                </span>
              </div>
            </React.Fragment>
          ))}
          {loadCount < filteredArr.length && (
            <div ref={ref} style={{ height: '20px' }} /> // Невидимый триггер для подгрузки
          )}
        </div>
      </main>
    </>
  );
}

export default Table;
