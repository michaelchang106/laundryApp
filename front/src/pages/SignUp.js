import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <h1>Sign Up Page</h1>
      <ul>
        <li key="signUpProviders">
          <Link to="/signUpProviders">Providers Sign Up</Link>
        </li>
        <li key="signUpCustomers">
          <Link to="/signUpCustomers">Customers Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}

export default SignUp;
