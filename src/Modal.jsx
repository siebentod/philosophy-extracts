import './Modal.css';

function Modal({ show, onClose, children }) {
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
