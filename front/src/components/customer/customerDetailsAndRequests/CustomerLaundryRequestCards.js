import React from "react";
import Card from "../../ui/Card";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function CustomerLaundryRequestCards(props) {
  return (
    <div className="mt-2">
      <Card>
        <div className="row">
          <h1 className="d-flex justify-content-center">
            {props.request.providerDetails.companyName}
          </h1>
          <span className="col-12">
            <strong>Date: </strong> {props.request.date}
          </span>
          <span className="col-6">
            <strong>Phone: </strong> {props.request.providerDetails.phoneNumber}
          </span>
          <span className="col-6">
            <strong>Email: </strong> {props.request.providerEmail}
          </span>
          <span className="col-6">
            <strong>Address: </strong> {props.request.providerDetails.address}
          </span>
          <span className="col-6">
            <strong>City: </strong> {props.request.providerDetails.city}
          </span>
          <span className="col-6">
            <strong>Provider Accepted: </strong>{" "}
            {props.request.providerAccepted.toString()}
          </span>
          <span className="col-6">
            <strong>Job Completed: </strong>{" "}
            {props.request.serviceComplete.toString()}
          </span>
          <span className="col-6">
            <strong>Total Cost: </strong>
            {currencyFormatter.format(props.request.totalCost)}
          </span>
        </div>
      </Card>
    </div>
  );
}

export default CustomerLaundryRequestCards;
