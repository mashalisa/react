import { useLocation } from "wouter";


const LinkToRegister = ({ text, link }) => {
 
  const [_, navigate] = useLocation();

  const handleClick = () => {
    // Navigate to the desired path and toggle the login state
    if (link === 'Login') {
      navigate('/Login');
    
    } else {
      navigate('/SignUp');
     
    }
  };

  return (
    <p className="text">
      {text}
      <span onClick={handleClick}>
        {link}
      </span>
    </p>
  );
};

export default LinkToRegister;