const selectStyle = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#2f3237',
    border: '1px solid #5e636e',
    '&:hover': {
      border: '1px solid #c2c9d6',
    },
    boxShadow: 'none',
    fontSize: '0.813rem',
    padding: '0px',
    margin: '0px',
    height: '30px',
    transition: 'border-color 0.25s',
    minHeight: '30px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingRight: '3px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.87)',
    paddingRight: '0',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#8f96a3',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#5e636e' : '#2f3237',
    color: state.isSelected ? '#8f96a3;' : 'rgba(255, 255, 255, 0.87)',
    '&:hover': {
      backgroundColor: '#5e636e',
    },
    '&:focus': {
      backgroundColor: '#5e636e',
    },
    fontSize: '0.8rem',
    paddingBottom: '1px',
    paddingTop: '1px',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#2f3237',
    marginTop: '2px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: '1px',
    paddingRight: '3px',
    color: '#5e636e',
    '&:hover': {
      color: '#8f96a3',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: '0',
    paddingRight: '4px',
    color: '#5e636e',
    '&:hover': {
      color: '#8f96a3',
      cursor: 'pointer',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: '#5e636e',
  }),
  input: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.87)',
  }),
};

export default selectStyle;
