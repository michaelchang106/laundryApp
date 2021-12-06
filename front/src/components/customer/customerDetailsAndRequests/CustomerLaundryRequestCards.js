import React from "react";
import Card from "../../ui/Card";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function CustomerLaundryRequestCards(props) {
  console.log(props.providerDetails);
  return (
    <div className="mt-2">
      <Card>
        {/*        <h3 className="d-flex justify-content-center">
          {props.providerDetails.companyName}
        </h3>*/}
        <div className="row">
          <span className="col-12">
            <strong>Date: </strong> {props.date}
          </span>
          <span className="col-6">
            <strong>Email: </strong> {props.providerEmail}
          </span>
          {/*<span className="col-6">
            <strong>Phone: </strong> {props.providerDetails.phoneNumber}
          </span>
          <span className="col-6">
            <strong>Address: </strong> {props.providerDetails.address}
          </span>
          <span className="col-6">
            <strong>City: </strong> {props.providerDetails.city}
          </span>*/}
          <span className="col-6">
            <strong>Provider Accepted: </strong>{" "}
            {props.providerAccepted.toString()}
          </span>
          <span className="col-6">
            <strong>Job Completed: </strong> {props.serviceComplete.toString()}
          </span>
          <span className="col-6">
            <strong>Total Cost: </strong>
            {currencyFormatter.format(props.totalCost)}
          </span>
        </div>
      </Card>
    </div>
  );
}

export default CustomerLaundryRequestCards;
