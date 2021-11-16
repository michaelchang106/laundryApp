import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <h1>Sign Up Page</h1>
      <ul>
        <li>
          <Link to="/signUpProviders">Providers Sign Up</Link>
        </li>
        <li>
          <Link to="/signUpCustomers">Customers Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}

export default SignUp;
