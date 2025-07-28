
import ReactSelect from 'react-select';
import CustomDropdownIndicator from './DropdownIndicator';
import React, { forwardRef } from 'react';



const Select = forwardRef(({ name, value, onChange, colorBar, categories, colors, data, isLabel}, ref) => {
  if (isLabel == undefined){
    isLabel = true
  }
  console.log(isLabel, 'isLabel in select')
  let options = [];
  console.log(options, 'options in begiinig')
  if(name === 'theme'){
    console.log(name, 'name')
    console.log(options, 'options')
    options = colorBar.map((color) => ({
      value: color.color,
      label: color.color,
      color: color.number, // Assuming this is a color code like 'rgb(255, 0, 0)'
      isDisabled: !!data.some((budget) => budget.theme === color.color && budget.is_used)
      
      // isDisabled: true
    }));
   
  }
  else if(name === 'category'){
    console.log(categories, 'categories in select')
     options = categories.map((category) => ({
      value: category.value,
      label: category.label,
    }));

  
   
  }




  return (
    <div>
      {isLabel  && <label htmlFor={name}>{name}</label>}
      <ReactSelect
        ref={ref}
        inputId={name}
        name={name}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => onChange(selectedOption)}
        options={options}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
        getOptionLabel={(e) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {name === 'theme' && <span
              className="theme-color"
              style={{
                backgroundColor: e.color,
                width: 16,
                height: 16,
                borderRadius: '50%',
                display: 'inline-block',
              }}
            ></span>}
            {e.label}
          
          </div>
        )}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: '#ccc',
            marginBottom: '1em',
            color: 'var(--color-primary)',
            boxShadow: 'none',
            '&:hover': { borderColor: '#aaa' },
            
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)', // Optional rotation
            transition: 'transform 0.3s ease',
            '&:hover': {
              color: '#0056b3',
            },
          }),
    
        }}
        placeholder={name === 'theme' ? "Select a color" : "Select a category"}
      />
    </div>
  );
});

export default Select;

