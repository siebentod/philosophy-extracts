'use client';

import { useEffect, useLayoutEffect, useReducer } from 'react';

import { looseIncludes, normalIncludes } from './looseIncludes.js';
import LinksIcons from './LinksIcons.jsx';
import { initialState, reducer } from '../lib/lib.js';
import { dataRandom } from '../lib/data.js';
import Table from './Table';
import Header from './Header';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

function App({ children }) {
  const [
    {
      filteredArr,
      filteredCount,
      searchText,
      selectedPeriod,
      selectedAuthor,
      filteredAuthors,
      loose,
      status,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const authorName = searchParams.get('author');
  const showModal = pathname.startsWith('/text');

  const onSearchChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'searchInput', payload: value });
  };

  const onCheckboxChange = () => {
    dispatch({ type: 'toggleLoose', payload: !loose });
  };

  const onPeriodChange = (selectedPeriod) => {
    console.log(selectedPeriod);
    if (selectedPeriod && selectedPeriod !== 'default') {
      dispatch({ type: 'chosenPeriod', payload: selectedPeriod });
      authorHandleWhenPeriodSelected(selectedPeriod);
    } else dispatch({ type: 'clearPeriod' });
  };

  const onAuthorChange = (selectedA) => {
    console.log('selectedA', selectedA);
    if (selectedA && selectedA !== 'default') {
      dispatch({ type: 'chosenAuthor', payload: selectedA });
      router.push(`/?author=${selectedA}`);
    } else dispatch({ type: 'clearAuthor' });
  };

  const handleClearSelect = (type) => {
    if (type === 'author') {
      dispatch({ type: 'clearAuthor' });
    } else dispatch({ type: 'clearPeriod' });
  };

  const handleCardAuthor = (e, obj) => {
    e.stopPropagation();
    dispatch({ type: 'authorFromCard', payload: obj.author });
    router.push(`/?author=${obj.author}`);
  };

  const openModal = (e, obj) => {
    e.preventDefault();
    router.push(`/text/${obj.id}`);
  };

  const handleRandom = (e) => {
    const filtered = filteredArr;
    const random = filtered[Math.floor(Math.random() * filteredCount)];
    openModal(e, random);
  };

  function authorHandleWhenPeriodSelected(period) {
    const authors = new Set();
    dataRandom.forEach((item) => {
      if (item.period === period) {
        authors.add(item.author);
      }
    });
    const filteredAuthors = Array.from(authors)
      .sort()
      .map((author) => ({
        value: author,
        label: author,
      }));
    dispatch({ type: 'filteredAuthors', payload: filteredAuthors });
  }

  useLayoutEffect(() => {
    if (authorName) {
      dispatch({ type: 'authorFromCard', payload: authorName });
    }
  }, [authorName, showModal]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    if (status === 'loaded' && !selectedAuthor && !showModal) {
      // console.log(selectedAuthor);
      // if (selectedAuthor === 'default' && !showModal) {
      router.push('/');
    }
  }, [router, selectedAuthor, showModal, status]);

  useEffect(() => {
    const varArrFiltered = dataRandom.filter((item) => {
      let matchesContent;
      const matchesAuthor =
        selectedAuthor && selectedAuthor !== 'default'
          ? item.author === selectedAuthor
          : true;
      const matchesPeriod =
        selectedPeriod && selectedPeriod !== 'default'
          ? item.period === selectedPeriod
          : true;
      loose
        ? (matchesContent = looseIncludes(searchText, item))
        : (matchesContent = normalIncludes(searchText, item));
      return matchesPeriod && matchesContent && matchesAuthor;
    });
    const filteredCount = varArrFiltered.length;
    dispatch({
      type: 'filtered',
      payload: { filteredArr: varArrFiltered, filteredCount: filteredCount },
    });
  }, [searchText, selectedPeriod, selectedAuthor, loose]);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        router.push('/');
      }
    });

    return () => {
      window.removeEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          router.push('/');
        }
      });
    };
  }, [router]);

  return (
    <>
      <LinksIcons />

      <Header
        onSearchChange={onSearchChange}
        onCheckboxChange={onCheckboxChange}
        onPeriodChange={onPeriodChange}
        onAuthorChange={onAuthorChange}
        handleClearSelect={handleClearSelect}
        handleRandom={handleRandom}
        filteredAuthors={filteredAuthors}
        selectedPeriod={selectedPeriod}
        selectedAuthor={selectedAuthor}
        searchText={searchText}
      />
      <div className="countResults" style={{ fontSize: '0.8rem' }}>
        {filteredCount < 1172 && `${filteredCount} результатов найдено`}
      </div>
      <Table
        filteredArr={filteredArr}
        openModal={openModal}
        handleCardAuthor={handleCardAuthor}
      />
      {showModal && children}
    </>
  );
}

export default App;
