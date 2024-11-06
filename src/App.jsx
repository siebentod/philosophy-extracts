import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import parse from 'html-react-parser';
import Select from 'react-select';

import { Helmet } from 'react-helmet';
import './App.scss';
import './index.css';
import './globals.css';
import Modal from './Modal.jsx';
import selectStyle from './selectStyle';
import { looseIncludes, normalIncludes } from './looseIncludes.js';
import LinksIcons from './LinksIcons.jsx';
import { initialState, reducer } from './lib.js';
import { dataRandom } from './data.js';

function App() {
  const [
    {
      filteredArr,
      filteredCount,
      showModal,
      modalContent,
      searchText,
      selectedPeriod,
      selectedAuthor,
      filteredAuthors,
      loose,
      status,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { id, authorName } = useParams();
  const [visibleCards, setVisibleCards] = useState([]);
  const [loadCount, setLoadCount] = useState(50);
  const { ref, inView } = useInView();

  const onSearchChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'searchInput', payload: value });
  };

  const onPeriodChange = useCallback(function onPeriodChange(selectedPeriod) {
    if (selectedPeriod) {
      dispatch({ type: 'chosenPeriod', payload: selectedPeriod });
      authorHandleWhenPeriodSelected(selectedPeriod);
    } else dispatch({ type: 'clearPeriod' });
  }, []);

  const onAuthorChange = useCallback(
    function onAuthorChange(selectedAuthor) {
      if (selectedAuthor) {
        dispatch({ type: 'chosenAuthor', payload: selectedAuthor });
        navigate(`/author/${selectedAuthor.value}`);
      } else dispatch({ type: 'clearAuthor' });
    },
    [navigate]
  );

  const handleCardAuthor = (e, obj) => {
    e.stopPropagation();
    dispatch({ type: 'authorFromCard', payload: obj.author });
    navigate(`/author/${obj.author}`);
  };

  const openModal = (e, obj) => {
    e.preventDefault();
    dispatch({
      type: 'showModal',
      payload: obj,
    });
    navigate(`/text/${obj.id}`);
  };

  const closeModal = () => {
    dispatch({
      type: 'hideModal',
    });
    navigate('/');
  };

  const handleRandom = (e) => {
    const filtered = filteredArr;
    const random = filtered[Math.floor(Math.random() * filteredCount)];
    openModal(e, random);
  };

  function authorHandleWhenPeriodSelected(period) {
    const authors = new Set();
    dataRandom.forEach((item) => {
      if (item.period === period.value) {
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
    if (id) {
      const item = dataRandom.find((obj) => obj.id === id);
      if (item) {
        dispatch({
          type: 'showModal',
          payload: item,
        });
      }
    } else if (authorName) {
      dispatch({ type: 'authorFromCard', payload: authorName });
    } else if (showModal) {
      dispatch({
        type: 'hideModal',
      });
    }
  }, [id, authorName, showModal]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    if (status === 'loaded' && !selectedAuthor && !showModal) {
      navigate('/');
    }
  }, [navigate, selectedAuthor, showModal, status]);

  useEffect(() => {
    const varArrFiltered = dataRandom.filter((item) => {
      let matchesContent;
      const matchesAuthor = selectedAuthor
        ? item.author === selectedAuthor.value
        : true;
      const matchesPeriod = selectedPeriod
        ? item.period === selectedPeriod.value
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

  const periods = useMemo(
    () => [
      { value: 'antiquity', label: 'Античность' },
      { value: 'middleages', label: 'Средние века' },
      { value: 'renaissance', label: 'Ренессанс' },
      { value: 'earlymodern', label: 'Раннее Новое Время' },
      { value: 'latemodern', label: 'Позднее Новое Время' },
    ],
    []
  );

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
      <LinksIcons />
      {authorName ? (
        <Helmet>
          <title>{authorName}</title>
          <meta
            name="description"
            content="Антология отрывков философских текстов"
          />
        </Helmet>
      ) : (
        <Helmet>
          <title>Антология отрывков философских текстов</title>
          <meta
            name="description"
            content="С возможностью поиска и фильтрации"
          />
        </Helmet>
      )}
      <div className="filter">
        <div className="inputPlusCheckbox">
          <input
            onChange={onSearchChange}
            type="search"
            value={searchText}
            placeholder="Поиск по тексту"
          />
          <input
            type="checkbox"
            title="Loose"
            onChange={() => dispatch({ type: 'toggleLoose', payload: !loose })}
          />
        </div>
        <Select
          options={periods}
          onChange={onPeriodChange}
          placeholder="Выбрать эпоху"
          isClearable
          styles={selectStyle}
          value={selectedPeriod}
          className="select selectPeriod"
        />
        <Select
          options={filteredAuthors}
          onChange={onAuthorChange}
          placeholder="Выбрать автора"
          isClearable
          styles={selectStyle}
          value={selectedAuthor}
          className="select selectAuthor"
        />
        <button id="openRandom" onClick={handleRandom}>
          Open Random
        </button>
      </div>
      <div className="countResults" style={{ fontSize: '0.8rem' }}>
        {filteredCount < 1172 && `${filteredCount} результатов найдено`}
      </div>
      <main>
        <div className="grid">
          {visibleCards.map((obj) => (
            <React.Fragment key={obj.id}>
              <div
                className="card__part card__title"
                href={`/${obj.id}`}
                onClick={(e) => openModal(e, obj)}
              >
                {obj.title}
              </div>
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
      {modalContent && (
        <Modal show={showModal} onClose={closeModal}>
          <Helmet>
            <title>
              {modalContent.title} ({modalContent.authorFull})
            </title>
            <meta
              name="description"
              content="Антология отрывков философских текстов"
            />
          </Helmet>
          <h2>{modalContent.title}</h2>
          <h4>
            {modalContent.authorFull}, {modalContent.book}
          </h4>
          <div>{parse(modalContent.content)}</div>
        </Modal>
      )}
    </>
  );
}

export default App;
