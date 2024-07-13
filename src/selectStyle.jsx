const selectStyle = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#2f3237',
    border: '1px solid #5e636e',
    '&:hover': {
      border: '1px solid #c2c9d6',
    },
    boxShadow: 'none',
    fontSize: '0.8rem',
    padding: '0px',
    margin: '0px',
    height: 'mincontent',
    transition: 'border-color 0.25s',
    minHeight: '34px',
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
  singleValue: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.87)',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#2f3237',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    paddingTop: 1,
    paddingBottom: 1,
    color: '#5e636e',
    '&:hover': {
      color: '#8f96a3',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    paddingTop: 1,
    paddingBottom: 1,
    color: '#5e636e',
    '&:hover': {
      color: '#8f96a3',
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
