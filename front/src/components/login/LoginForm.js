import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import classes from "./LoginForm.module.css";

function LoginForm({ onLogin, setLoginSuccess, setUserType }) {
  // initailize react hooks
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  // onSubmit customer form handler
  async function loginSubmitHandler(event) {
    event.preventDefault();

    const loginEmail = emailRef.current.value;
    const loginPassword = passwordRef.current.value;

    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    const response = await onLogin(loginData);

    // if the response is an error
    if (response.error) {
      setErrorMessage(response.error);
    } else {
      // set localStorage with customer info
      setLoginSuccess(true);
      setUserType(response.userType);

      //------------Add setEmail
      navigate("/");
    }
  }

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
