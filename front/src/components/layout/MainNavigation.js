// MICHAEL CHANG & DANIEL LISKO

import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";

import { useContext } from "react";
import UserLoginContext from "../../store/UserLoginContext";

function MainNavigation() {
  const navigate = useNavigate();

  //intialize useContext
  const userContext = useContext(UserLoginContext);

  // reset states for logout and clear localStorage
  const logoutHandler = (event) => {
    localStorage.clear();
    userContext.setLoginStatus(false);
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
  // !== undefined IS A HACK...REFER TO APP.js FETCH RUNS 2 times

  if (userContext.userDetails && userContext.loginStatus) {
    if (userContext.userDetails.userType === "customer") {
      linksRender.push(
        <li key="customerRequestService">
          <Link to="/CustomerRequestService">Request Laundry</Link>
        </li>
      );
      linksRender.push(
        <li key="customerDetailsPage">
          <Link to="/CustomerDetailsPage">{`${userContext.userDetails.firstName} ${userContext.userDetails.lastName}`}</Link>
        </li>
      );
    } else {
      linksRender.push(
        <li key="providerPage">
          <Link to="/ProviderPage">{`${userContext.userDetails.companyName}`}</Link>
        </li>
      );
      linksRender.push(
        <li key="providerDetailsPage">
          <Link to="/ProviderDetailsPage">{`${userContext.userDetails.firstName} ${userContext.userDetails.lastName}`}</Link>
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
        <div className={classes.logo}>Hamper Dash</div>
      </Link>
      <nav>
        <ul>
          <li key="home">
            <Link to="/">Home</Link>
          </li>
          <li key="signup">
            <Link to="/SignUp">Sign Up</Link>
          </li>
          {linksRender}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
