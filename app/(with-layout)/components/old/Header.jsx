import { FaGithub, FaInfo, FaArrowUp, FaBars } from 'react-icons/fa';

import Link from 'next/link';

function Header({
  showFilter,
  handleLeftArrow,
  handleArrow,
  onSearchChange,
  handleRandom,
  filteredCount,
  strict,
  setStrict,
  searchText,
}) {
  return (
    <>
      <div className="filter">
        {showFilter && (
          <div className="icons scalable-icons">
            <Link href="/about">
              <FaInfo />
            </Link>
            <a href="https://github.com/siebentod/rigveda">
              <FaGithub />
            </a>
            {/* <FaAdjust onClick={toggleTheme} /> */}
          </div>
        )}
        <div className="filter__buttons">
          <div
            // className={`arrow-left ${!showCards ? ' toggle' : ''} ${
            className={`arrow-left ${!showFilter ? ' move' : ''}`}
            onClick={handleLeftArrow}
          >
            <FaBars />
          </div>
          <div
            className={`arrow-up ${!showFilter ? ' toggle' : ''}`}
            onClick={handleArrow}
          >
            <FaArrowUp />
          </div>
          {showFilter && (
            <div className="inputPlusRandom">
              <div className="inputPlusCheckbox scalable">
                <input
                  onChange={onSearchChange}
                  type="search"
                  value={searchText}
                  placeholder="Поиск по тексту"
                />
                <input
                  type="checkbox"
                  title="Strict"
                  onChange={() => setStrict(!strict)}
                />
              </div>
              <button className="openRandom scalable" onClick={handleRandom}>
                Open Random
              </button>
            </div>
          )}
        </div>
        {showFilter && searchText && (
          <div className="countResults" style={{ fontSize: '0.8rem' }}>
            {filteredCount} результатов найдено
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
