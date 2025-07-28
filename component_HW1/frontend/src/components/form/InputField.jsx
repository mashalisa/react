import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ name, type, value, onChange, label_name, placeholder, showPassword, setShowPassword }) => {
  const isPassword = type === 'password';
  return (
    <div className="input-field-container">
      <label htmlFor={name}>{label_name}</label>
      <input
        id={name}
        name={name}
        type={isPassword && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
       
      />
       {isPassword && (
       <button
      type="button"
      onClick={() => setShowPassword(prev => !prev)}
      className="toggle-visibility-btn"
      
    >
      <img
      src={showPassword ? '/img/icons/eye-off.svg' : '/img/icons/eye.svg'}
      alt={showPassword ? 'Hide password' : 'Show password'}
      style={{ width: '20px', height: '20px' }}
    />
     
    </button>
     )}
    </div>
  );
};

export default InputField;