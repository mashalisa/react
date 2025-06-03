const InputField = ({ name, type, value, onChange, label_name, placeholder }) => {
  return (
    <div>
      <label htmlFor={name}>{label_name}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;