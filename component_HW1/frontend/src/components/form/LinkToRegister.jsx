
const LinkToRegister = ({ text, link, setIsLoginForm }) => {
  return (
    <p className="text">
      {text}
       <span onClick={() => setIsLoginForm((prev) => !prev)}>
        {link}
      </span>
    </p>
  );
};

export default LinkToRegister;