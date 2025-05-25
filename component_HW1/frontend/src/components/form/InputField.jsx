const InputField = ({ name, type, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
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