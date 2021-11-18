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

function App() {
  let [loginSucess, setLoginSuccess] = useState(false);
  let [userType, setUserType] = useState();

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Home loginSucess={loginSucess} userType={userType} />}
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
      </Routes>
    </Layout>
  );
}

export default App;
