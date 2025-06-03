// ModalButton.jsx
import { useState } from 'react';
import Button from './button';
import Modal from './Modal';

const ModalButton = ({ btnName, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{btnName}</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {typeof children === 'function'
          ? children({ close: () => setIsOpen(false) })
          : children}
      </Modal>
    </>
  );
};

export default ModalButton;