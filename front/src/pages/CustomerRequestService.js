import LaundryRequestForm from "../components/customer/LaundryRequestForm";

function CustomerRequestService() {
  const laundryRequestFetch = async (data) => {
    console.log(data);
    const response = await fetch("/api/laundryRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  };

  return (
    <div>
      <h1>Customer Request Service</h1>
      <LaundryRequestForm laundryRequestFetch={laundryRequestFetch} />
    </div>
  );
}

export default CustomerRequestService;
