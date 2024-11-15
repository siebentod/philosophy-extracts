import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

function GetParams({ setStatus, setSelectedAuthor }) {
  const searchParams = useSearchParams();
  const authorName = searchParams.get('author');

  useEffect(() => {
    if (authorName) {
      setStatus('loaded');
      setSelectedAuthor(authorName);
    }
  }, [authorName, setSelectedAuthor, setStatus]);

  return <></>;
}

export default GetParams;
