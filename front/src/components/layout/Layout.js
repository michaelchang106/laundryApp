import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <MainNavigation
        loginSuccess={props.loginSuccess}
        userType={props.userType}
        setLoginSuccess={props.setLoginSuccess}
        setUserType={props.setUserType}
      />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
