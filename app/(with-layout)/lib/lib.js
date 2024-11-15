import { dataRandom } from './data.js';

export const authors = new Set();
dataRandom.forEach((item) => {
  authors.add(item.author);
});

export const initFilteredAuthors = Array.from(authors)
  .sort()
  .map((author) => ({
    value: author,
    label: author,
  }));
