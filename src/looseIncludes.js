export default function looseIncludes(searchPhrase, targetObject) {
  const sum = targetObject.title + ' ' + targetObject.content;
  const cleanedTarget = removeHTMLTags(sum);
  return cleanedTarget.toLowerCase().includes(searchPhrase.toLowerCase());
}

export function looseIncludesString(searchPhrase, targetString) {
  const cleanedTarget = removeHTMLTags(targetString);
  return cleanedTarget.toLowerCase().includes(searchPhrase);
}

const removeHTMLTags = (str) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = str;
  return tempDiv.textContent || tempDiv.innerText || '';
};
