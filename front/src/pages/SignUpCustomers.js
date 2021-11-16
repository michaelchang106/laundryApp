import { useNavigate } from "react-router-dom";

import SignUpCustomerForm from "../components/signups/SignUpCustomerForm";

function SignUpCustomers() {
  const navigate = useNavigate();

  async function createCustomerHandler(data) {
    await fetch("/api/createCustomer", {
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
      />
    </div>
  );
}

export default SignUpCustomers;
