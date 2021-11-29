/* MICHAEL CHANG */
import PropTypes from "prop-types";
import LoginForm from "../components/login/LoginForm";

function Login() {
  async function loginHandler(data) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  return (
    <div>
      <h1>Login Page</h1>

      <LoginForm loginHandler={loginHandler} />
    </div>
  );
}

Login.propTypes = {
  loginHandler: PropTypes.func,
};

export default Login;
