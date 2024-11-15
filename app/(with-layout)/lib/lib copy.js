import { dataRandom } from './data.js';

export const authors = new Set();
dataRandom.forEach((item) => {
  authors.add(item.author);
});

export const filtered = Array.from(authors)
  .sort()
  .map((author) => ({
    value: author,
    label: author,
  }));

export const initialState = {
  filteredArr: dataRandom,
  filteredCount: dataRandom.length,
  showModal: false,
  modalContent: null,
  searchText: '',
  selectedPeriod: 'default',
  selectedAuthor: 'default',
  filteredAuthors: filtered,
  loose: false,
  status: '',
};

export function reducer(state, action) {
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
    case 'clearPeriod':
      return {
        ...state,
        selectedPeriod: initialState.selectedPeriod,
        selectedAuthor: initialState.selectedAuthor,
        filteredAuthors: initialState.filteredAuthors,
      };
    case 'chosenAuthor':
      return {
        ...state,
        selectedAuthor: action.payload,
      };
    case 'clearAuthor':
      return {
        ...state,
        selectedAuthor: initialState.selectedAuthor,
      };
    case 'authorFromCard':
      return {
        ...state,
        status: 'loaded',
        selectedAuthor: action.payload,
        // selectedAuthor: {
        //   ...state.selectedAuthor,
        //   value: action.payload,
        //   label: action.payload,
        // },
      };
    case 'filteredAuthors':
      return {
        ...state,
        filteredAuthors: action.payload,
        selectedAuthor: initialState.selectedAuthor,
      };
    case 'showModal':
      return {
        ...state,
        modalContent: action.payload,
        showModal: true,
        status: 'loaded',
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
