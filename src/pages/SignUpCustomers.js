import { useNavigate } from "react-router-dom";

import SignUpCustomerForm from "../components/signups/SignUpCustomerForm";
import createLoginHandler from "../components/signups/createLoginHandler";

function SignUpCustomers() {
  const navigate = useNavigate();

  async function createCustomerHandler(data) {
    await fetch("/createCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      navigate("/");
    });
  }
  return (
    <div>
      <h1>Customers Sign Up Page</h1>
      <SignUpCustomerForm
        onCreateCustomer={createCustomerHandler}
        onCreateLogin={createLoginHandler}
      />
    </div>
  );
}

export default SignUpCustomers;
