const InputField = ({ name, type, value, onChange, label_name }) => {
  return (
    <div>
      <label htmlFor={name}>{label_name}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;