import { useEffect, useState } from 'react';
import './App.css';
import parse from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import { dataRandom } from './data.js';
import Modal from './Modal.jsx';
import Select from 'react-select';
import selectStyle from './selectStyle';
import looseIncludes from './looseIncludes.js';
import HeadInHelmet from './HeadInHelmet';
import { Helmet } from 'react-helmet';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authorsSet, setAuthorsSet] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const item = dataRandom.find((obj) => obj.id === id);
      if (item) {
        setModalContent(item);
        setShowModal(true);
      }
    } else {
      setShowModal(false);
    }
  }, [id]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  useEffect(() => {
    const authors = new Set();
    dataRandom.forEach((item) => {
      if (!selectedPeriod || item.period === selectedPeriod.value) {
        authors.add(item.author);
      }
    });
    setAuthorsSet(
      Array.from(authors).map((author) => ({
        value: author,
        label: author,
      }))
    );
    setSelectedAuthor(null);
  }, [selectedPeriod]);

  const applyFilters = () => {
    return dataRandom.filter((item) => {
      const matchesAuthor = selectedAuthor
        ? item.author === selectedAuthor.value
        : true;
      const matchesPeriod = selectedPeriod
        ? item.period === selectedPeriod.value
        : true;
      const matchesContent = looseIncludes(searchText, item);
      return matchesPeriod && matchesContent && matchesAuthor;
    });
  };

  useEffect(() => {
    setFilteredCount(applyFilters().length);
  }, [applyFilters]);

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const onPeriodChange = (selectedPeriod) => {
    setSelectedPeriod(selectedPeriod);
  };

  const onAuthorChange = (selectedAuthor) => {
    setSelectedAuthor(selectedAuthor);
  };

  const handleCardAuthor = (e, obj) => {
    e.stopPropagation();
    setSelectedAuthor({ value: obj.author, label: obj.author });
  };

  const openModal = (e, obj) => {
    e.preventDefault();
    setModalContent(obj);
    setShowModal(true);
    navigate(`/${obj.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleRandom = (e) => {
    const filtered = applyFilters();
    const random = filtered[Math.floor(Math.random() * applyFilters().length)];
    openModal(e, random);
  };

  return (
    <>
      <HeadInHelmet />
      <div className="filter">
        <input
          onChange={onSearchChange}
          type="search"
          value={searchText}
          placeholder="Поиск по тексту"
        />
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
        />
        <Select
          options={authorsSet}
          onChange={onAuthorChange}
          placeholder="Выбрать автора"
          isClearable
          styles={selectStyle}
          value={selectedAuthor}
        />
        <button id="openRandom" onClick={handleRandom}>
          Open Random
        </button>
      </div>
      <div className="countResults" style={{ fontSize: '0.8rem' }}>
        {filteredCount} результатов найдено
      </div>
      <main>
        {applyFilters().map((obj) => (
          <a
            href={`/${obj.id}`}
            className="card"
            key={obj.id}
            onClick={(e) => openModal(e, obj)}
          >
            <div className="card__title">
              <p>{obj.title}</p>
            </div>
            <div className="card__part card__author">
              <p
                onClick={(e) => {
                  e.preventDefault();
                  handleCardAuthor(e, obj);
                }}
              >
                {obj.author}
              </p>
            </div>
            <div className="card__part card__book">
              <p>{obj.book}</p>
            </div>
          </a>
        ))}
      </main>
      {modalContent && (
        <Modal show={showModal} onClose={closeModal}>
          <Helmet>
            <title>
              {modalContent.title} ({modalContent.author})
            </title>
            <meta
              name="description"
              content="Антология отрывков философских текстов"
            />
          </Helmet>
          <h2>{modalContent.title}</h2>
          <h4>
            {modalContent.author}, {modalContent.book}
          </h4>
          <p>{parse(modalContent.content)}</p>
        </Modal>
      )}
    </>
  );
}

export default App;
