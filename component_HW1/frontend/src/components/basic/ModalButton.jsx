// ModalButton.jsx
import { useState, useEffect, useRef } from 'react';
import Button from './button';
import Modal from './Modal';

const ModalButton = ({ btnName, children, className, style, onOpen }) => {

  const [isOpen, setIsOpen] = useState(false);
  
  const wasOpen = useRef(false); // tracks last isOpen state
  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      if (typeof onOpen === 'function') {
        onOpen(); // only call when transitioning to open
      }
    }
    wasOpen.current = isOpen;
  }, [isOpen, onOpen]);
  

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