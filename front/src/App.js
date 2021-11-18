import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import RedirectHome from "./pages/RedirectHome.js";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SignUpProviders from "./pages/SignUpProviders";
import SignUpCustomers from "./pages/SignUpCustomers";
import Layout from "./components/layout/Layout";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import ProviderDetailsPage from "./pages/ProviderDetailsPage";

function App() {
  let [loginSuccess, setLoginSuccess] = useState(false);
  let [userType, setUserType] = useState();

  return (
    <Layout
      loginSuccess={loginSuccess}
      userType={userType}
      setLoginSuccess={setLoginSuccess}
      setUserType={setUserType}
    >
      <Routes>
        <Route
          path="/"
          element={<Home loginSuccess={loginSuccess} userType={userType} />}
        />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/Login"
          element={
            <Login
              setLoginSuccess={setLoginSuccess}
              setUserType={setUserType}
            />
          }
        />
        <Route path="/signUpProviders" element={<SignUpProviders />} />
        <Route path="/signUpCustomers" element={<SignUpCustomers />} />
        <Route path="/CustomerDetailspage" element={<CustomerDetailsPage />} />
        <Route path="/ProviderDetailspage" element={<ProviderDetailsPage />} />
        <Route path="/redirectHome" element={<RedirectHome />} />
      </Routes>
    </Layout>
  );
}

export default App;
