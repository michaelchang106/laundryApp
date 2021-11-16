import { useHistory } from "react";

import SignUpCustomerForm from "../components/signups/SignUpCustomerForm";
import createLoginHandler from "../components/signups/createLoginHandler";

function SignUpCustomers() {
  const history = useHistory();

  async function createCustomerHandler(data) {
    await fetch("/createCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      history.replace("/");
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
