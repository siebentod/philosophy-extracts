import { useEffect } from 'react';
import './Modal.css';

function Modal({ show, onClose, children }) {
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    });

    return () => {
      window.removeEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          onClose();
        }
      });
    };
  }, []);

  if (!show) {
    return null;
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-scrollable-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
