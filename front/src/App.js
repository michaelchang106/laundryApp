import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import RedirectHome from "./pages/RedirectHome.js";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SignUpProviders from "./pages/SignUpProviders";
import SignUpCustomers from "./pages/SignUpCustomers";
import Layout from "./components/layout/Layout";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import CustomerRequestService from "./pages/CustomerRequestService";
import ProviderPage from "./pages/ProviderPage";
import ProviderDetailsPage from "./pages/ProviderDetailsPage";

function App() {
  const loginSuccess = localStorage.getItem("loginSuccess");
  const [userData, setUserData] = useState();
  const [loginSuccessState, setLoginSuccessState] = useState(loginSuccess);

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

  useEffect(() => {
    if (loginSuccessState === "true") {
      const setData = async () => {
        const userType = localStorage.getItem("userType");
        const email = localStorage.getItem("email");
        const credentials = { email: email, userType: userType };
        setUserData(await findUserDetails(credentials));
      };
      setData();
    }
    console.log("I AM IN THE USE EFFECT---");
  }, [loginSuccessState]);

  console.log(userData, "APP LEVEL DATA FETCH FROM DB"); //WHY DOES THIS RUN 2 times?

  return (
    <Layout
      userData={userData}
      loginSuccessState={loginSuccessState}
      setLoginSuccessState={setLoginSuccessState}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/Login"
          element={<Login setLoginSuccessState={setLoginSuccessState} />}
        />
        <Route path="/signUpProviders" element={<SignUpProviders />} />
        <Route path="/signUpCustomers" element={<SignUpCustomers />} />
        <Route
          path="/CustomerDetailspage"
          element={<CustomerDetailsPage userData={userData} />}
        />
        <Route
          path="/CustomerRequestService"
          element={<CustomerRequestService />}
        />
        <Route path="/ProviderPage" element={<ProviderPage />} />
        <Route
          path="/ProviderDetailspage"
          element={<ProviderDetailsPage userData={userData} />}
        />
        <Route path="/redirectHome" element={<RedirectHome />} />
      </Routes>
    </Layout>
  );
}

export default App;
