import SignUpCustomerForm from "../components/signups/SignUpCustomerForm";

function SignUpCustomers() {
  async function createCustomerFetch(data) {
    const response = await fetch("/api/createCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  async function findEmailFetch(data) {
    const response = await fetch("/api/findEmailExists", {
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
        createCustomerFetch={createCustomerFetch}
        findEmailFetch={findEmailFetch}
      />
    </div>
  );
}

export default SignUpCustomers;
