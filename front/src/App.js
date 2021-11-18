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
  const [loginSuccess, setLoginSuccess] = useState();
  const [userData, setUserData] = useState();
  const userType = localStorage.getItem("userType");
  const email = localStorage.getItem("email");

  async function findUserDetailsFetch(data) {
    const response = await fetch("/api/findUserDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  useEffect(async () => {
    console.log("CALLING USE EFFECT");
    if (localStorage.length > 0) {
      console.log("USER IS LOGGED IN");
      setLoginSuccess(true);
      const userDataResponse = await findUserDetailsFetch({
        email: email,
        userType: userType,
      });
      setUserData(userDataResponse);
    } else {
      console.log("NOT LOGGED IN");
      setLoginSuccess(false);
      setUserData();
    }
  }, [email, userType]);

  console.log(userData);

  return (
    <Layout
      loginSuccess={loginSuccess}
      setLoginSuccess={setLoginSuccess}
      userData={userData}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/Login"
          element={<Login setLoginSuccess={setLoginSuccess} />}
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
