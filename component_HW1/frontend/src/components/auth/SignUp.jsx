import ButtonSubmit from "../form/Button"
import InputField from "../form/InputField"
import LinkToRegister from "../form/LinkToRegister";
const SignUp = ({ setIsLogin, setIsLoginForm }) => {

     return (
    <div className="right">
      <div className="form-container">
        <h1>Sign Up</h1>
         <InputField name = "Name" type = "text"/>
        <InputField name = "Email" type = "email"/>
        <InputField name = "Create password" type = "password"/>
        <ButtonSubmit   setIsLogin={setIsLogin} name="Create Account" />
        <LinkToRegister
          text="Already have an account?"
          link="Login"
          setIsLoginForm={setIsLoginForm}
        />
     </div>
    </div>
  
  )
}

export default SignUp; 