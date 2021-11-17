import SignUpCustomerForm from "../components/signups/SignUpCustomerForm";

function SignUpCustomers() {
  async function createCustomerHandler(data) {
    const response = await fetch("/api/createCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  async function findEmailHandler(data) {
    const response = await fetch("/api/findEmail", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: data,
    });

    return await response.json();
  }
  return (
    <div>
      <h1>Customers Sign Up Page</h1>
      <SignUpCustomerForm
        onCreateCustomer={createCustomerHandler}
        onEmailChange={findEmailHandler}
      />
    </div>
  );
}

export default SignUpCustomers;
