// ModalButton.jsx
import { useState, useEffect, useRef } from 'react';
import Button from './button';
import Modal from './Modal';

const ModalButton = ({ btnName, children, className, style, onOpen, onClose }) => {

  const [isOpen, setIsOpen] = useState(false);
  
  const wasOpen = useRef(false); // tracks last isOpen state
  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      if (typeof onOpen === 'function') {
        onOpen(); // only call when transitioning to open
      }
    }
    else if (!isOpen && wasOpen.current) {
      if (typeof onClose === 'function') {
        onClose(); // only call when transitioning to close
      }
    }
    wasOpen.current = isOpen;
  }, [isOpen, onOpen, onClose]);
  

  return (
    <>
      <Button   style={style} className={className} onClick={() => setIsOpen(true)}>{btnName}</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {typeof children === 'function'
          ? children({ close: () => setIsOpen(false) })
          : children}
      </Modal>
    </>
  );
};

export default ModalButton;