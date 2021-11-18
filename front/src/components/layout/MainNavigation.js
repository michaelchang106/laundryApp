import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation(props) {
  // initialize hooks (loginState has Link)
  const [loginNavigationState, setloginNavigationState] = useState();
  const [signOut, setSignOut] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // reset states for logout and clear localStorage
    function logoutHandler(event) {
      setloginNavigationState(false);
      localStorage.clear();
      localStorage.setItem("loginSuccess", false);
      navigate("/");
    }

    // check localStorage for cached Login
    const userType = localStorage.getItem("userType");
    const email = localStorage.getItem("email");
    const loginSuccess = localStorage.getItem("email");

    // if loginSuccess state is true replace Login Link to Customer/Provider Detail Page Link
    if (loginSuccess) {
      if (userType === "customer") {
        setloginNavigationState(
          <Link to="/CustomerDetailsPage">Customer Name</Link>
        );
      } else {
        setloginNavigationState(
          <Link to="/ProviderDetailsPage">Provider Name</Link>
        );
      }
      // create signout button
      setSignOut(
        <button
          className={classes.logout}
          onClick={logoutHandler}
          type="button"
        >
          Log out
        </button>
      );
      // else set default navigation bar
    } else {
      setloginNavigationState(<Link to="/Login">Login</Link>);
      setSignOut();
    }
  }, [props, navigate]);

  // navigation bar component
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
          <li>{loginNavigationState}</li>
          <li>{signOut}</li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
