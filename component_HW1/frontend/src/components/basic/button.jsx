import { useState } from 'react';
import Modal from './Modal';
import InputField from '../form/InputField';
import ButtonSubmit from './ButtonSubmit';
const Button = function ({ onClick, children, className, style }) {
  return (
    <button onClick={onClick} className={className || 'default-btn'} style={style}>
      {children}
    </button>
  );
};


export default Button;