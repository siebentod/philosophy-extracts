'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { defaultExcerpt, searchExcerpt } from '../lib/lib';
import parse from 'html-react-parser';

function Cards({ filteredArr, handleCardAuthor, searchText }) {
  const [visibleCards, setVisibleCards] = useState([]);
  const [loadCount, setLoadCount] = useState(50);
  const { ref, inView } = useInView();

  const excerpt = (text) =>
    searchText &&
    searchText.length > 2 &&
    text.content.toLowerCase().includes(searchText.toLowerCase())
      ? searchExcerpt(text.content, searchText) // Показываем текст вокруг строки
      : defaultExcerpt(text.content);

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
        <div className="grid class-cards">
          {visibleCards.map((obj) => (
            <div className="card" key={obj.id}>
              {/* Заголовок карточки */}
              <Link
                className="card__title"
                href={`/text/${obj.id}`}
                title={obj.title}
              >
                {obj.title}
              </Link>

              {/* Книга и автор */}
              <div className="card__details">
                <button
                  className="card__author"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCardAuthor(e, obj);
                  }}
                >
                  {obj.author}
                </button>
                <span className="card__book" title={obj.book}>
                  {obj.book}
                </span>
              </div>

              {/* Экстракт текста */}
              <p className="card__excerpt">
                {parse(excerpt(obj)) || 'Текстовый экстракт отсутствует.'}
              </p>
            </div>
          ))}

          {/* Невидимый триггер для подгрузки */}
          {loadCount < filteredArr.length && (
            <div ref={ref} style={{ height: '20px' }} />
          )}
        </div>
      </main>
    </>
  );
}

export default Cards;
