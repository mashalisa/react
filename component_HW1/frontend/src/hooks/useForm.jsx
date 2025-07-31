import { useState } from "react";

export const useForm = (initial = {}) => {
    const [formData, setFormData] = useState(initial);


function handleInput(e) {
    const { value, name} = e.target
        setFormData({...formData, [name]: value})
}

function handleChange(selectedOption, fieldName) {
   

        setFormData({ ...formData, [fieldName]: selectedOption?.value });
        console.log('Selected:', selectedOption);
        console.log('Updated formData:', { ...formData, [fieldName]: selectedOption?.value });
   
}




function handleChangeTheme(selectedOption, fieldName, colors, setColors, setIsUsed) {
   
    const isUsedValue = colors.some((color) => color.color === selectedOption.label);
    const updatedColors = colors.map((color) => {
        return color; // keep structure if you want to visually reflect "used" themes later
      });
      setColors(updatedColors);
      setFormData({
        ...formData,
        [fieldName]: selectedOption?.value,
        is_used: isUsedValue,
      });
      console.log('Selected:', selectedOption);
      console.log('Updated formData:', {
        ...formData,
        [fieldName]: selectedOption?.value,
        is_used: isUsedValue,
      });
}
return {
  formData,
  setFormData,
  handleInput,
  handleChange,
  handleChangeTheme,
};

}