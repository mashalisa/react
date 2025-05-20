import ButtonSubmit from "../form/Button"
import InputField from "../form/InputField"
import LinkToRegister from "../form/LinkToRegister";
const Login = ({ setIsLogin }) => {

     return (
    
    <div className="right">
      <div className="form-container">
        <h1>Login</h1>
        <InputField name = "Email" type = "email"/>
        <InputField name = "Password" type = "password"/>
        <ButtonSubmit  name="Login" />
        <LinkToRegister  
            text="need to create an account?" 
            link = "Sing Up"  
            setIsLogin={setIsLogin} />
     </div>
    </div>
  
  )
}

export default Login; 