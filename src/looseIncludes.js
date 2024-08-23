export function looseIncludes(searchPhrase, targetObject) {
  const sum =
    targetObject.title + ' ' + targetObject.book + ' ' + targetObject.content;
  const cleanedTarget = removeHTMLTags(sum);
  return cleanedTarget.toLowerCase().includes(searchPhrase.toLowerCase());
}

export function normalIncludes(searchPhrase, targetObject) {
  const sum =
    targetObject.title + ' ' + targetObject.book + ' ' + targetObject.content;
  return sum.toLowerCase().includes(searchPhrase.toLowerCase());
}

const removeHTMLTags = (str) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = str;
  return tempDiv.textContent || tempDiv.innerText || '';
};

function looseIncludesString(searchPhrase, targetString) {
  const cleanedTarget = removeHTMLTags(targetString);
  return cleanedTarget.toLowerCase().includes(searchPhrase);
}
