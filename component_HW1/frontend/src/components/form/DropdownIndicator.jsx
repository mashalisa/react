import { components } from 'react-select';
import arrowDown from '/img/icons/arrow-down.png';

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={arrowDown} alt="arrow" style={{ width: 11, height: 6 }} />
    </components.DropdownIndicator>
  );
};
export default CustomDropdownIndicator;