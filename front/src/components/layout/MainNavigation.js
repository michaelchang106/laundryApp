import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation(props) {
  // initialize hooks (loginState has Link)
  const [userTypeNavigation, setUserTypeNavigation] = useState();
  const [signOut, setSignOut] = useState();
  const [actionPage, setActionPage] = useState();

  const navigate = useNavigate();

  // check localStorage for cached Login
  const userType = localStorage.getItem("userType");
  const email = localStorage.getItem("email");

  useEffect(() => {
    // reset states for logout and clear localStorage
    function logoutHandler(event) {
      setUserTypeNavigation();
      setActionPage();
      localStorage.clear();
      props.setLoginSuccess(false);
      navigate("/");
    }

    // if loginSuccess state is true replace Login Link to Customer/Provider Detail Page Link
    if (props.loginSuccess) {
      if (userType === "customer") {
        setUserTypeNavigation(
          <Link to="/CustomerDetailsPage">Customer Name</Link>
        );
      } else {
        setUserTypeNavigation(
          <Link to="/ProviderDetailsPage">Provider Name</Link>
        );
      }
      // create signout button
      setSignOut(
        <li>
          <button
            className={classes.logout}
            onClick={logoutHandler}
            type="button"
          >
            Log out
          </button>
        </li>
      );

      if (userType === "customer") {
        setActionPage(
          <li>
            <Link to="/CustomerRequestService">Request Laundry</Link>
          </li>
        );
      } else {
        setActionPage(
          <li>
            <Link to="/ProviderPage">Provider Business Name</Link>
          </li>
        );
      }

      // else set default navigation bar
    } else {
      setUserTypeNavigation(<Link to="/Login">Login</Link>);
      setSignOut();
    }
  }, [navigate, props, userType]);

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
          {actionPage}
          <li>{userTypeNavigation}</li>
          {signOut}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
