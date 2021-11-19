import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <MainNavigation
        userData={props.userData}
        setLoginSuccessState={props.setLoginSuccessState}
        loginSuccessState={props.loginSuccessState}
      />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
