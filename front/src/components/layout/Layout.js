import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <MainNavigation
        loginSuccess={props.loginSuccess}
        setLoginSuccess={props.setLoginSuccess}
        userData={props.userData}
      />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
