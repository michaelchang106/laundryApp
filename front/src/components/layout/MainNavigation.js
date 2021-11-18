import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation(props) {
  // initialize hooks (loginState has Link)
  const [loginState, setloginState] = useState(<Link to="/Login">Login</Link>);
  const [signOut, setSignOut] = useState();

  useEffect(() => {
    function logoutHandler(event) {
      setloginState(false);
      props.setUserType();
      props.setLoginSuccess(false);
    }

    // if loginSuccess state is true replace ahref login to Customer/Provider detail page
    if (props.loginSuccess) {
      if (props.userType === "customer") {
        setloginState(<Link to="/CustomerDetailsPage">Customer Name</Link>);
      } else {
        setloginState(<Link to="/ProviderDetailsPage">Provider Name</Link>);
      }
      // create signout button
      setSignOut(
        <button className={classes.logout} onClick={logoutHandler} type="button">
          Log out
        </button>
      );
    } else {
      setloginState(<Link to="/Login">Login</Link>);
      setSignOut();
    }
  }, [props]);

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
          <li>{loginState}</li>
          <li>{signOut}</li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
