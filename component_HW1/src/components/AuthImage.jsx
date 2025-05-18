const AuthImage = (props) => {
  return (
    <div className="left">
      <img src="../public/img/bg.png" alt="" />
      <h3 className="title">{props.title}</h3>
      <p className="text">{props.text}</p>
    </div>
  );
}

export default AuthImage; 