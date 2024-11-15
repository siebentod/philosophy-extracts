'use client';

import { useRouter } from 'next/navigation';

function ModalWrapClient({ children }) {
  const router = useRouter();
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      router.push('/');
    }
  };

  // const closeModal = () => {
  //   dispatch({
  //     type: 'hideModal',
  //   });
  //   navigate('/');
  // };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default ModalWrapClient;
