const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button onClick={onClose} className="close-btn"><img src="./img/close.png" alt="close"  /></button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;