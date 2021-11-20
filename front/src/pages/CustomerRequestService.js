import LaundryRequestForm from "../components/customer/LaundryRequestForm";
import { useState } from "react";
import Card from "../components/ui/Card";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let availableProviders = [];
let servicesPrice = {};

function CustomerRequestService() {
  let providerCardRender = [];

  const [gotProivders, setGotProivders] = useState();

  const laundryRequestFetch = async (data) => {
    const response = await fetch("/api/laundryRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    availableProviders = await response.json();
    servicesPrice = data;

    // THIS IS HACK-WHAT SHOULD THIS ACTUALLY BE?
    //I'm just setting true false back and forth for it to re-render
    setGotProivders(!gotProivders);
  };

  // const getAdditionalServices = () => {
  //   const additionalServices = [];

  //   for (const [key, value] of Object.entries(servicesPrice)) {
  //     console.log(`${key}: ${value}`);
  //   }
  // };

  availableProviders.forEach((provider) => {
    providerCardRender.push(
      <Card>
        <h5>Bussiness: {provider.companyName}</h5>
        <ul>
          <li>Email: {provider.email}</li>
          <li>Address: {provider.address}</li>
          <li>City: {provider.city}</li>
          <li>State: {provider.state}</li>
          <li>Zip Code: {provider.zipCode}</li>
          <li>Phone Number: {provider.phoneNumber}</li>
          <li>
            Cost for laundry:{" "}
            {currencyFormatter.format(
              provider.services.pricePerPounds * servicesPrice.poundsOfLaundry
            )}
          </li>
        </ul>
      </Card>
    );
  });

  return (
    <div>
      <h1>Customer Request Service</h1>
      <LaundryRequestForm laundryRequestFetch={laundryRequestFetch} />
      <div>{providerCardRender}</div>
    </div>
  );
}

export default CustomerRequestService;
