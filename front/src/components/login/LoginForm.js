import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import classes from "./LoginForm.module.css";

import { useContext } from "react";
import UserLoginContext from "../../store/UserLoginContext";

function LoginForm(props) {
  // initailize react hooks
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  //intialize useContext
  const userContext = useContext(UserLoginContext);

  // onSubmit customer form handler
  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    const loginEmail = emailRef.current.value;
    const loginPassword = passwordRef.current.value;

    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    const response = await props.loginHandler(loginData);

    // if the response is an error
    if (response.error) {
      setErrorMessage(response.error);
    } else {
      // set localStorage with customer info
      localStorage.setItem("email", response.email);
      localStorage.setItem("userType", response.userType);
      localStorage.setItem("loginSuccess", true);

      const setData = async () => {
        const userType = localStorage.getItem("userType");
        const email = localStorage.getItem("email");
        const credentials = { email: email, userType: userType };
        userContext.setUserDetails(
          await userContext.findUserDetails(credentials)
        );
        userContext.setLoginStatus(true);
      };
      setData();

      //navigate to Customer Request page or Provider Service Page
      if (response.userType === "customer") {
        navigate("/CustomerRequestService");
      } else {
        navigate("/ProviderPage");
      }
    }
  };

  // form component
  return (
    <Card>
      <form className={classes.form} onSubmit={loginSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="email@email.com"
            required
            name="email"
            ref={emailRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            ref={passwordRef}
          />
        </div>
        <div className={classes.error}>
          <p>{errorMessage}</p>
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
    </Card>
  );
}

export default LoginForm;
