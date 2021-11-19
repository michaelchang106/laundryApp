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

  const findUserDetails = async (data) => {
    const response = await fetch("/api/findUserDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    setUserData(json);
  };

  useEffect(() => {
    if (localStorage.length > 0) {
      setLoginSuccess(true);
      const userQuery = {
        email: email,
        userType: userType,
      };
      findUserDetails(userQuery);
    } else {
      setLoginSuccess(false);
      setUserData();
    }
  }, [email, userType]);

  console.log(userData); //WHY DOES THIS RUN 3 times?

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
