export async function generateMetadata({ searchParams }) {
  const author = (await searchParams)?.author;
  if (author) {
    return {
      title: `${author} | Extracts`,
      description: 'Антология отрывков философских текстов',
    };
  }
  return {
    title: 'Extracts | Антология отрывков философских текстов',
    description: 'С поиском и фильтрацией по авторам',
  };
}

export default function Page() {
  return null;
}
