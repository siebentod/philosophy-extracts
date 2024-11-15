import { AiOutlineClose } from 'react-icons/ai';
import Select from './Select';

const periods = [
  { value: 'antiquity', label: 'Античность' },
  { value: 'middleages', label: 'Средние века' },
  { value: 'renaissance', label: 'Ренессанс' },
  { value: 'earlymodern', label: 'Раннее Новое Время' },
  { value: 'latemodern', label: 'Позднее Новое Время' },
];

function Header({
  onSearchChange,
  onCheckboxChange,
  onPeriodChange,
  onAuthorChange,
  handleClearSelect,
  handleRandom,
  filteredAuthors,
  selectedPeriod,
  selectedAuthor,
  searchText,
}) {
  return (
    <>
      <div className="filter">
        <div className="inputPlusCheckbox">
          <div className="relative h-full">
            <input
              onChange={onSearchChange}
              type="search"
              value={searchText}
              placeholder="Поиск по тексту"
              id="search"
            />
            {searchText && (
              <button
                className="clear-select absolute right-0.5 top-1/2 bg-transparent border-none cursor-pointer flex content-center"
                onClick={() => handleClearSelect('search')}
              >
                <AiOutlineClose />
              </button>
            )}
          </div>
          <input
            type="checkbox"
            title="Loose"
            onChange={onCheckboxChange}
            id="checkbox"
          />
        </div>
        <Select
          onChange={(e) => onPeriodChange(e.target.value)}
          value={selectedPeriod}
          className="select selectPeriod"
          handleClearSelect={() => handleClearSelect('period')}
        >
          <option value="default">Выбрать эпоху</option>
          {periods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </Select>
        <Select
          onChange={(e) => onAuthorChange(e.target.value)}
          value={selectedAuthor}
          className="select selectAuthor"
          handleClearSelect={() => handleClearSelect('author')}
        >
          <option value="default">Выбрать автора</option>
          {filteredAuthors.map((author) => (
            <option key={author.value} value={author.value}>
              {author.label}
            </option>
          ))}
        </Select>
        <button id="openRandom" onClick={handleRandom}>
          Open Random
        </button>
      </div>
    </>
  );
}

export default Header;
