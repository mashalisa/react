import { useState } from 'react';
import Modal from './Modal';
import InputField from '../form/InputField';
import ButtonSubmit from './ButtonSubmit';
const Button = function ({ onClick, children, className }) {
  return (
    <button onClick={onClick} className={className || 'default-btn'}>
      {children}
    </button>
  );
};


export default Button;