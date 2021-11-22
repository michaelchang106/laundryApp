import LaundryRequestForm from "../components/customer/LaundryRequestForm";
import { useState } from "react";
import Card from "../components/ui/Card";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let availableProviders = [];
let servicesRequested = {};

function CustomerRequestService() {
  let providerCardRender = [];
  let providerCards = [];

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
    servicesRequested = data;

    //I'm just setting true false back and forth for component to re-render
    setGotProivders(!gotProivders);
  };

  // push cards into an array
  availableProviders.forEach((provider) => {
    const laundryCost = servicesRequested.wash
      ? provider.serviceObjects.wash.price * servicesRequested.wash
      : 0;

    const dryCleanCost = servicesRequested.dryClean
      ? provider.serviceObjects.dryClean.price * servicesRequested.dryClean
      : 0;

    const foldingCost = servicesRequested.fold
      ? provider.serviceObjects.fold.price
      : 0;

    const deliveryCost = servicesRequested.delivery
      ? provider.serviceObjects.delivery.price
      : 0;

    const totalCost = laundryCost + dryCleanCost + foldingCost + deliveryCost;

    providerCards.push([
      <div className="mt-2">
        <Card>
          <div className="row p-4">
            <h3 className="d-flex justify-content-center">
              {provider.companyName}
            </h3>
            <div className="row">
              <span className="col-12">
                <strong>Date: </strong> {servicesRequested.date}
              </span>
            </div>
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
            </div>
            <div className="row">
              <span className="d-flex justify-content-end">
                <strong>
                  Total Costs:
                  {currencyFormatter.format(totalCost)}
                </strong>
              </span>
            </div>
          </div>
        </Card>
      </div>,
      servicesRequested.date,
      totalCost,
      provider.zipCode,
    ]);
  });

  console.log(providerCards);

  // push cards[0] into an array to render in the react component
  providerCards.forEach((card) => {
    providerCardRender.push(card[0]);
  });

  return (
    <div>
      <h1>Request Laundry Service Now!</h1>
      <div className="row">
        <div className="col-4">
          <LaundryRequestForm laundryRequestFetch={laundryRequestFetch} />
        </div>
        <div className="col-8">{providerCardRender}</div>
      </div>
    </div>
  );
}

export default CustomerRequestService;
