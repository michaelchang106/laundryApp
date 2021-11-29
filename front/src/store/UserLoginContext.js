/* MICHAEL CHANG */

import { createContext, useState, useEffect } from "react";

// create context
const UserLoginContext = createContext({
  userDetails: {},
  loginStatus: false,
});

// check localStorage
const loginSuccess = localStorage.getItem("loginSuccess");

export function UserLoginContextProvider(props) {
  const [userDetails, setUserDetails] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);

  function setLoginStatusCtx(bool) {
    setLoginStatus(bool);
  }

  function setUserDetailsCtx(user) {
    setUserDetails(user);
  }

  function addUserDetailsHandler(details) {
    for (const [key, value] of Object.entries(details)) {
      setUserDetails({ ...userDetails, [key]: value });
    }
  }

  function removeUserDetailsHandler() {
    setUserDetails();
  }

  // fetch for userDetails
  const findUserDetails = async (data) => {
    const response = await fetch("/api/findUserDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  // if localStorage is "true" (NOTE: localStorage only stores strings)
  useEffect(() => {
    if (loginSuccess === "true") {
      const setData = async () => {
        const userType = localStorage.getItem("userType");
        const email = localStorage.getItem("email");
        const credentials = { email: email, userType: userType };
        setUserDetails(await findUserDetails(credentials));
        setLoginStatus(true);
      };
      setData();
    }
  }, []);

  const context = {
    userDetails: userDetails,
    loginStatus: loginStatus,
    addUserDetailsHandler: addUserDetailsHandler,
    removeUserDetailsHandler: removeUserDetailsHandler,
    findUserDetails: findUserDetails,
    setLoginStatus: setLoginStatusCtx,
    setUserDetails: setUserDetailsCtx,
  };

  return (
    <UserLoginContext.Provider value={context}>
      {props.children}
    </UserLoginContext.Provider>
  );
}

export default UserLoginContext;
