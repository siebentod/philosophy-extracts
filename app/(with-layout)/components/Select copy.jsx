import { useState, useRef, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export default function Select({
  children,
  className = '',
  onChange,
  value,
  handleClearSelect,
}) {
  const [width, setWidth] = useState(0);
  const selectRef = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      console.log('[s', value, selectRef.current);
      // Измеряем ширину текста выбранного option, используя выбранное значение (value)
      const selectedOption = Array.from(selectRef.current.options).find(
        (option) => option.value === value
      );
      console.log('[p', value, selectedOption, selectedOption.offsetWidth);
      if (selectedOption) {
        setWidth(selectedOption.offsetWidth + 64); // +24 для учета паддингов и стрелки
      }
    }
  }, [value]);

  return (
    <div className="relative h-full">
      <div className="inline-block">
        <select
          ref={selectRef}
          onChange={onChange}
          value={value}
          className={`${className} border px-2 py-1 rounded transition-all`}
          style={{ width: `${width}px` }}
        >
          {children}
        </select>
      </div>
      {handleClearSelect && value !== 'default' && (
        <button
          className="clear-select absolute right-1 top-1/2 bg-transparent border-none cursor-pointer flex content-center"
          onClick={handleClearSelect}
        >
          <AiOutlineClose />
        </button>
      )}
    </div>
  );
}
