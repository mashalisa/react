
import ReactSelect from 'react-select';

// const Select = ({name, value, onChange, colorBar}) => {
  

 

//   return (
//     <div>
//       <label htmlFor={name}>Choose a color:</label>
//       <select id="dropdown" name={name} value={value}  onChange={onChange} >
//         {colorBar.map((color, index) => {
//             return (
//                 <option key={index} value={color.color}><span className="theme-color" style={{backgroundColor: color.number}}></span>{color.color}</option>
//             )
//         })}
//       </select>

//     </div>
//   );
// };

// export default Select;



const Select = ({ name, value, onChange, colorBar, categories, colors}) => {

  let options = [];
  console.log(options, 'options in begiinig')
  if(name === 'theme'){
    console.log(name, 'name')
    console.log(options, 'options')
    options = colorBar.map((color) => ({
      value: color.color,
      label: color.color,
      color: color.number, // Assuming this is a color code like 'rgb(255, 0, 0)'
      // isDisabled: colors.some(c => c.color === color.color && c.isUsed),
    }));
   
  }
  else if(name === 'category'){
     options = categories.map((category) => ({
      value: category.value,
      label: category.label,
    }));
   
  }




  return (
    <div>
      <label htmlFor={name}>Theme</label>
      <ReactSelect
        inputId={name}
        name={name}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => onChange(selectedOption)}
        options={options}
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
            boxShadow: 'none',
            '&:hover': { borderColor: '#aaa' },
          }),
        }}
        placeholder={name === 'theme' ? "Select a color" : "Select a category"}
      />
    </div>
  );
};

export default Select;

