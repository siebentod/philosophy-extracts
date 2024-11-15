'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { data } from '../lib/data.js';
import Cards from './Cards';
import Header from './Header';

// const favorites = ['10_90', '10_129'];
// const initialText = favorites[Math.floor(Math.random() * favorites.length)];

function App({ children }) {
  const [showFilter, setShowFilter] = useState(true);
  const [showCards, setShowCards] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [strict, setStrict] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);
  const [filteredArr, setFilteredArr] = useState(data);
  const router = useRouter();

  const looseIncludes = useCallback(
    function looseIncludes(searchPhrase, targetObject) {
      const sum = targetObject.title + ' ' + targetObject.hymn;
      const regex = new RegExp(
        `(^|[^а-яёa-zA-Z])${searchPhrase.toLowerCase()}`,
        'g'
      );
      return strict
        ? sum.toLowerCase().match(regex)
        : sum.toLowerCase().includes(searchPhrase.toLowerCase());
    },
    [strict]
  );

  useEffect(() => {
    setFilteredArr(data.filter((item) => looseIncludes(searchText, item)));
  }, [looseIncludes, searchText, strict]);

  useEffect(() => {
    setFilteredCount(filteredArr.length);
  }, [filteredArr]);

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  // const openModal = (e, obj) => {
  //   e.preventDefault();
  //   router.push(`/${obj.id}`);
  // };

  // const closeModal = () => {
  //   router.push('/');
  // };

  const handleRandom = () => {
    const random = filteredArr[Math.floor(Math.random() * filteredArr.length)];
    router.push(`/${random.id}`);
  };

  const handleArrow = () => {
    setShowFilter((showFilter) => !showFilter);
  };

  const handleLeftArrow = () => {
    setShowCards((showCards) => !showCards);
  };

  return (
    <>
      <div className={`prajapati ${!showFilter ? 'filterHidden' : ''}`}>
        <Header
          showFilter={showFilter}
          handleLeftArrow={handleLeftArrow}
          handleArrow={handleArrow}
          onSearchChange={onSearchChange}
          handleRandom={handleRandom}
          filteredCount={filteredCount}
          strict={strict}
          setStrict={setStrict}
          searchText={searchText}
        />
        <main className={!showFilter ? 'filterHidden' : ''}>
          <Cards filteredArr={filteredArr} showCards={showCards} />
          {children}
        </main>
      </div>
    </>
  );
}

export default App;
