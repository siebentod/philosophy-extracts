// app/[id]/BookContent.js
'use client';

import { useRouter } from 'next/navigation';

export default function BookContent() {
  const router = useRouter();

  const handleButtonClick = async (newId) => {
    router.push(`/${newId}`);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleButtonClick('1')}>Показать Книгу 1</button>
        <button onClick={() => handleButtonClick('2')}>Показать Книгу 2</button>
      </div>
    </div>
  );
}
