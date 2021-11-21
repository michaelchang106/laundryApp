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

    //I'm just setting true false back and forth for component to re-render
    setGotProivders(!gotProivders);
  };

  availableProviders.forEach((provider) => {
    const laundryCost = servicesPrice.wash
      ? provider.serviceObjects.wash.price * servicesPrice.wash
      : 0;

    const dryCleanCost = servicesPrice.dryClean
      ? provider.serviceObjects.dryClean.price * servicesPrice.dryClean
      : 0;

    const foldingCost = servicesPrice.fold
      ? provider.serviceObjects.fold.price
      : 0;

    const deliveryCost = servicesPrice.delivery
      ? provider.serviceObjects.delivery.price
      : 0;

    const totalCost = laundryCost + dryCleanCost + foldingCost + deliveryCost;

    providerCardRender.push(
      <Card>
        <h5>Business: {provider.companyName}</h5>
        <div className="row">
          <span className="col-6">
            <strong>Email: </strong> {provider.email}
          </span>
          <span className="col-6">
            <strong>Phone Number: </strong> {provider.phoneNumber}
          </span>
          <span className="col-6">
            <strong>Address: </strong> {provider.address}
          </span>
          <span className="col-6">
            <strong>City: </strong> {provider.city}
          </span>
          <span className="col-6">
            <strong>State: </strong> {provider.state}
          </span>
          <span className="col-6">
            <strong>Zip Code: </strong> {provider.zipCode}
          </span>
        </div>
        <div className="row">
          <span className="col-6">
            <strong>Laundry Cost: </strong>
            {currencyFormatter.format(laundryCost)}
          </span>
          <span className="col-6">
            <strong>Dry Cleaning Cost: </strong>
            {currencyFormatter.format(dryCleanCost)}
          </span>
          <span className="col-6">
            <strong>Cost for Folding: </strong>
            {currencyFormatter.format(foldingCost)}
          </span>
          <span className="col-6">
            <strong>Cost for Delivery: </strong>
            {currencyFormatter.format(deliveryCost)}
          </span>
          <span className="col-6">
            <strong>
              Total Costs:
              {currencyFormatter.format(totalCost)}
            </strong>
          </span>
        </div>
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
