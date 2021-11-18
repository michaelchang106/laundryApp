import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation(props) {
  const [loginState, setloginState] = useState(<Link to="/Login">Login</Link>);
  const [signOut, setSignOut] = useState();

  function logoutHandler(event) {
    console.log("LOG OUT CLICKED");
  }

  useEffect(() => {
    if (props.loginSuccess) {
      if (props.userType === "customer") {
        setloginState(<Link to="/CustomerDetailsPage">Customer Name</Link>);
      } else {
        setloginState(<Link to="/ProviderDetailsPage">Provider Name</Link>);
      }

      setSignOut(
        <button onClick={logoutHandler} type="button">
          Sign Out
        </button>
      );
    } else {
      setloginState(<Link to="/Login">Login</Link>);
      setSignOut();
    }
  }, [props.loginSuccess, props.userType]);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Laundry App</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/SignUp">Sign Up</Link>
          </li>
          <li>{loginState}</li>
          <li> {signOut}</li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
