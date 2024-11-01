import { useEffect, useReducer } from 'react';
import './App.scss';
import './index.css';
import parse from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import { dataRandom } from './data.js';
import Modal from './Modal.jsx';
import Select from 'react-select';
import selectStyle from './selectStyle';
import { looseIncludes, normalIncludes } from './looseIncludes.js';
import HeadInHelmet from './HeadInHelmet';
import { Helmet } from 'react-helmet';

const initialState = {
  filteredArr: dataRandom,
  filteredCount: dataRandom.length,
  showModal: false,
  modalContent: null,
  searchText: '',
  selectedPeriod: null,
  selectedAuthor: null,
  authorsSet: [],
  loose: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'filtered':
      return {
        ...state,
        filteredArr: action.payload.filteredArr,
        filteredCount: action.payload.filteredCount,
      };
    case 'searchInput':
      return {
        ...state,
        searchText: action.payload,
      };
    case 'chosenPeriod':
      return {
        ...state,
        selectedPeriod: action.payload,
      };
    case 'chosenAuthor':
      return {
        ...state,
        selectedAuthor: action.payload,
      };
    case 'authorFromCard':
      return {
        ...state,
        selectedAuthor: {
          ...state.selectedAuthor,
          value: action.payload,
          label: action.payload,
        },
      };
    case 'authorsSet':
      return {
        ...state,
        authorsSet: action.payload,
      };
    case 'showModal':
      return {
        ...state,
        modalContent: action.payload,
        showModal: true,
      };
    case 'hideModal':
      return {
        ...state,
        showModal: false,
      };
    case 'toggleLoose':
      return {
        ...state,
        loose: action.payload,
      };
  }
}

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
      authorsSet,
      loose,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { id } = useParams();

  const onSearchChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'searchInput', payload: value });
  };

  const onPeriodChange = (selectedPeriod) => {
    dispatch({ type: 'chosenPeriod', payload: selectedPeriod });
  };

  const onAuthorChange = (selectedAuthor) => {
    dispatch({ type: 'chosenAuthor', payload: selectedAuthor });
  };

  const handleCardAuthor = (e, obj) => {
    e.stopPropagation();
    dispatch({ type: 'authorFromCard', payload: obj.author });
  };

  const openModal = (e, obj) => {
    e.preventDefault();
    dispatch({
      type: 'showModal',
      payload: obj,
    });
    navigate(`/${obj.id}`);
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

  useEffect(() => {
    if (id) {
      const item = filteredArr.find((obj) => obj.id === id);
      if (item) {
        dispatch({
          type: 'showModal',
          payload: item,
        });
      }
    } else {
      dispatch({
        type: 'hideModal',
      });
    }
  }, [id]);

  useEffect(() => {
    const authors = new Set();
    dataRandom.forEach((item) => {
      if (!selectedPeriod || item.period === selectedPeriod.value) {
        authors.add(item.author);
      }
    });
    const authorsSet = Array.from(authors)
      .sort()
      .map((author) => ({
        value: author,
        label: author,
      }));
    dispatch({ type: 'authorsSet', payload: authorsSet });
    dispatch({ type: 'chosenAuthor', payload: null });
  }, [selectedPeriod]);

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
  }, [searchText, selectedPeriod, selectedAuthor]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);
  console.log(loose);

  return (
    <>
      <HeadInHelmet />
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
          options={[
            { value: 'antiquity', label: 'Античность' },
            { value: 'middleages', label: 'Средние века' },
            { value: 'renaissance', label: 'Ренессанс' },
            { value: 'earlymodern', label: 'Раннее Новое Время' },
            { value: 'latemodern', label: 'Позднее Новое Время' },
          ]}
          onChange={onPeriodChange}
          placeholder="Выбрать эпоху"
          isClearable
          styles={selectStyle}
          value={selectedPeriod}
          className="select selectPeriod"
        />
        <Select
          options={authorsSet}
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
        {filteredCount} результатов найдено
      </div>
      <main>
        <div className="grid">
          {filteredArr.map((obj) => (
            <>
              <div
                className="card__part card__title"
                href={`/${obj.id}`}
                key={obj.id}
                onClick={(e) => openModal(e, obj)}
              >
                {obj.title}
              </div>
              <div className="card__part card__bookAndAuthor">
                <span className="card__bookAndAuthor__book">{obj.book} </span>
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
            </>
          ))}
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
          <p>{parse(modalContent.content)}</p>
        </Modal>
      )}
    </>
  );
}

export default App;
