import ButtonSubmit from "./form/Button"
import InputField from "./form/InputField"
import LinkToRegister from "./form/LinkToRegister";
const SignUp = ({ setIsLogin }) => {

     return (
    <div className="right">
      <div className="form-container">
        <h1>Sign Up</h1>
         <InputField name = "Name" type = "text"/>
        <InputField name = "Email" type = "email"/>
        <InputField name = "Create password" type = "password"/>
        <ButtonSubmit  name="Create Account" />
        <LinkToRegister
          text="Already have an account?"
          link="Login"
          setIsLogin={setIsLogin}
        />
     </div>
    </div>
  
  )
}

export default SignUp; 