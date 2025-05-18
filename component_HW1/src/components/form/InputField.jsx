const InputField = (props) => {
  return (
    <div>
      <label>{props.name}</label>
      <input type={props.type} />
    </div>
  );
}

export default InputField; 