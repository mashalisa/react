// ModalButton.jsx
import { useState, useCallback } from 'react';
import Button from './button';
import Modal from './Modal';

const ModalButton = ({ btnName, children, className, style, onOpen, onClose }) => {

  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = useCallback(() => {
   if (typeof onOpen === 'function') {
    onOpen();
   }
    setIsOpen(true);
  }, [onOpen]);

  const closeModal = useCallback(() => {
    if (typeof onClose === 'function') { 
      onClose();  
    }
    setIsOpen(false);
  }, [onClose]);
  

  return (
    <>
      <Button   style={style} className={className} onClick={openModal}>{btnName}</Button>
      <Modal isOpen={isOpen}  onClose={closeModal}>
      {typeof children === 'function' ? children({ close: closeModal }) : children}
      </Modal>
    </>
  );
};

export default ModalButton;