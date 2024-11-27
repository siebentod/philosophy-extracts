import { useState, useRef, useEffect } from 'react';
import { AiOutlineClose, AiOutlineDown } from 'react-icons/ai';

export default function Select({
  children,
  className = '',
  onChange,
  value,
  handleClearSelect,
}) {
  const [width, setWidth] = useState('133');
  const spanRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (spanRef.current) {
        const optionWidth = spanRef.current.offsetWidth;
        // console.log('spanRef.current', spanRef.current);
        optionWidth > 133
          ? setWidth(spanRef.current.offsetWidth)
          : setWidth(133);
      }
    };

    updateWidth();
    // window.addEventListener('resize', updateWidth);

    // return () => {
    //   window.removeEventListener('resize', updateWidth);
    // };
  }, [value]);

  //   console.log('children', children);
  //   console.log('children[0].props.value', children[0].props.value);

  //   for (let i = 0; i < children[1].length; i++) {
  //     console.log(`children[${i}]`, children[1][i].props?.value === value);
  //   }

  console.log('value', value);

  const currentOption = children[1].find((child) => {
    return child.props?.value === value;
  });
  console.log('currentOption', currentOption);

  return (
    <div className="relative h-full">
      {/* Невидимый span для измерения ширины текста */}
      <span
        ref={spanRef}
        className={`${className} absolute invisible whitespace-nowrap`}
      >
        {currentOption?.props?.children ||
          // children[0]?.props?.children ||
          'Выбрать эпоху'}
      </span>

      <select
        onChange={onChange}
        value={value}
        className={`${className} border rounded transition-all`}
        style={{ width: `${width}px` }}
      >
        {children}
      </select>
      {handleClearSelect && value && value !== 'default' ? (
        <button
          className="clear-select absolute right-0.5 top-1/2 bg-transparent border-none cursor-pointer flex content-center"
          onClick={handleClearSelect}
        >
          <AiOutlineClose />
        </button>
      ) : (
        <button className="clear-select absolute right-0.5 top-1/2 bg-transparent border-none flex content-center text-sm pointer-events-none">
          <AiOutlineDown />
        </button>
      )}
    </div>
  );
}
