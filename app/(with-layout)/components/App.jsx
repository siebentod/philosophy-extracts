'use client';

import { Suspense, useEffect, useState } from 'react';

import { looseIncludes, normalIncludes } from './looseIncludes.js';
import LinksIcons from './LinksIcons.jsx';
import { initFilteredAuthors } from '../lib/lib.js';
import { dataRandom } from '../lib/data.js';
import Table from './Table';
import Header from './Header';
import { usePathname, useRouter } from 'next/navigation';
import GetParams from './GetParams.jsx';

function App({ children }) {
  const [filteredArr, setFilteredArr] = useState(dataRandom);
  const [filteredCount, setFilteredCount] = useState(dataRandom.length);
  const [searchText, setSearchText] = useState('');
  const [loose, setLoose] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('default');
  const [selectedAuthor, setSelectedAuthor] = useState('default');
  const [filteredAuthors, setFilteredAuthors] = useState(initFilteredAuthors);
  const [status, setStatus] = useState('');

  const pathname = usePathname();
  const router = useRouter();
  const showModal = pathname.startsWith('/text');

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const onCheckboxChange = () => {
    setLoose(!loose);
  };

  const onPeriodChange = (selectedPeriod) => {
    console.log(selectedPeriod);
    if (selectedPeriod && selectedPeriod !== 'default') {
      setSelectedPeriod(selectedPeriod);
      authorHandleWhenPeriodSelected(selectedPeriod);
    } else {
      setSelectedPeriod('default');
      setSelectedAuthor('default');
      setFilteredAuthors(initFilteredAuthors);
    }
  };

  const onAuthorChange = (selectedA) => {
    console.log('selectedA', selectedA);
    if (selectedA && selectedA !== 'default') {
      setSelectedAuthor(selectedA);
      router.push(`/?author=${selectedA}`);
    } else setSelectedAuthor('default');
  };

  const handleClearSelect = (type) => {
    if (type === 'author') {
      setSelectedAuthor('default');
      router.push('/');
    }
    if (type === 'period') {
      setSelectedPeriod('default');
      setFilteredAuthors(initFilteredAuthors);
    }
    if (type === 'search') {
      setSearchText('');
    }
  };

  const handleCardAuthor = (e, obj) => {
    e.stopPropagation();
    setStatus('loaded');
    setSelectedAuthor(obj.author);
    router.push(`/?author=${obj.author}`);
  };

  const openModal = (e, obj) => {
    e.preventDefault();
    router.push(`/text/${obj.id}`);
  };

  const handleRandom = (e) => {
    const random = filteredArr[Math.floor(Math.random() * filteredCount)];
    openModal(e, random);
  };

  function authorHandleWhenPeriodSelected(period) {
    const authors = new Set();
    dataRandom.forEach((item) => {
      if (item.period === period) {
        authors.add(item.author);
      }
    });
    const filteredAuthorsOptions = Array.from(authors)
      .sort()
      .map((author) => ({
        value: author,
        label: author,
      }));
    setFilteredAuthors(filteredAuthorsOptions);
    setSelectedAuthor('default');
    router.push('/');
  }

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      document.title = 'Extracts | Антология отрывков философских текстов';
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
    setFilteredArr(varArrFiltered);
    setFilteredCount(filteredCount);
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
      <Suspense>
        <GetParams
          setStatus={setStatus}
          setSelectedAuthor={setSelectedAuthor}
        />
      </Suspense>

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
      <div className="countResults">
        {filteredCount < 1172 && `${filteredCount} результатов найдено`}
      </div>
      <Table
        filteredArr={filteredArr}
        // openModal={openModal}
        handleCardAuthor={handleCardAuthor}
      />
      {showModal && children}
    </>
  );
}

export default App;
