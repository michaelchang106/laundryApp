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

  useEffect(() => {
    if (localStorage.length > 0) {
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
    }
  }, []);

  return (
    <Layout loginSuccess={loginSuccess} setLoginSuccess={setLoginSuccess}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/Login"
          element={<Login setLoginSuccess={setLoginSuccess} />}
        />
        <Route path="/signUpProviders" element={<SignUpProviders />} />
        <Route path="/signUpCustomers" element={<SignUpCustomers />} />
        <Route path="/CustomerDetailspage" element={<CustomerDetailsPage />} />
        <Route
          path="/CustomerRequestService"
          element={<CustomerRequestService />}
        />
        <Route path="/ProviderPage" element={<ProviderPage />} />
        <Route path="/ProviderDetailspage" element={<ProviderDetailsPage />} />
        <Route path="/redirectHome" element={<RedirectHome />} />
      </Routes>
    </Layout>
  );
}

export default App;
