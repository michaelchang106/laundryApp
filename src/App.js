import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignUpProviders from "./pages/SignUpProviders";
import SignUpCustomers from "./pages/SignUpCustomers";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/signUpProviders" element={<SignUpProviders />} />
        <Route path="/signUpCustomers" element={<SignUpCustomers />} />
      </Routes>
    </Layout>
  );
}

export default App;
