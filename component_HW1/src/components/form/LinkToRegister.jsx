
const LinkToRegister = (props) => {
  return (
    <p className="text">
      {props.text}
      <span onClick={() => props.setIsLogin((prev) => !prev)}>
        {props.link}
      </span>
    </p>
  );
};

export default LinkToRegister;