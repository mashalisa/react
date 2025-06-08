import { useState } from 'react';
import Button from './button'
const DropDownMenu = ({ btnName, children }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
        <Button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">{btnName}</Button>
        {isOpen && (
          <div className="dropdown-menu">
            {typeof children === 'function'
              ? children({ close: () => setIsOpen(false) })
              : children}
          </div>
        )}
      </>
    );
  };

export default DropDownMenu;
