import LoginForm from "../components/login/LoginForm";

function Login(props) {
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

      <LoginForm
        loginHandler={loginHandler}
        setLoginSuccessState={props.setLoginSuccessState}
      />
    </div>
  );
}

export default Login;
