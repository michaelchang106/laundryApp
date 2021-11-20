import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation(props) {
  // check localStorage for cached Login
  const userType = localStorage.getItem("userType");

  // initialize hooks (loginState has Link)
  const navigate = useNavigate();

  // reset states for logout and clear localStorage
  const logoutHandler = (event) => {
    localStorage.clear();
    props.setLoginSuccessState("false");
    navigate("/");
  };

  let linksRender = [];

  const logoutLink = () => {
    return (
      <li key="logout">
        <button
          className={classes.logout}
          onClick={logoutHandler}
          type="button"
        >
          Log out
        </button>
      </li>
    );
  };

  // if loginSuccess state is true replace Login Link to Customer/Provider Detail Page Link
  if (props.loginSuccessState === "true" && props.userData !== undefined) {
    // !== undefined IS A HACK...REFER TO APP.js FETCH RUNS 2 times
    if (userType === "customer") {
      linksRender.push(
        <li key="customerRequestService">
          <Link to="/CustomerRequestService">Request Laundry</Link>
        </li>
      );
      linksRender.push(
        <li key="customerDetailsPage">
          <Link to="/CustomerDetailsPage">{`${props.userData.firstName} ${props.userData.lastName}`}</Link>
        </li>
      );
    } else {
      linksRender.push(
        <li key="providerPage">
          <Link to="/ProviderPage">Provider Business Name</Link>
        </li>
      );
      linksRender.push(
        <li key="providerDetailsPage">
          <Link to="/ProviderDetailsPage">Provider Name</Link>
        </li>
      );
    }
    linksRender.push(logoutLink());

    // else set default navigation bar
  } else {
    linksRender.push(
      <li key="login">
        <Link to="/Login">Login</Link>
      </li>
    );
  }

  // MainNavgiation component
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Laundry App</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/SignUp">Sign Up</Link>
          </li>
          {linksRender}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
