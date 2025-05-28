const AuthImage = (props) => {
  return (
    <div className="left">
      <img src="/img/auth.png" alt="Background" />
      <div className="text-container">
        <h3 className="title">{props.title}</h3>
        <p className="text">{props.text}</p>
      </div>
    </div>
  );
}

export default AuthImage; 