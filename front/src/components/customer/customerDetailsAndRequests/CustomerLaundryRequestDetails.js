/* MICHAEL CHANG */
import Card from "../../ui/Card";

import { useContext } from "react";
import UserLoginContext from "../../../store/UserLoginContext";

let allCustomerRequests = [];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function CustomerLaundryRequestDetails() {
  // array for card render
  let customerRequestsRender = [];

  //intialize useContext
  const userContext = useContext(UserLoginContext);
  const customerEmail = { customerEmail: userContext.userDetails.email };

  // fetch requests from DB
  const allCustomerLaundryRequestsFetch = async (data) => {
    const response = await fetch("/api/allCustomerLaundryRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    allCustomerRequests = await response.json();
  };

  // this should be AWAITed....
  allCustomerLaundryRequestsFetch(customerEmail);
  console.log(allCustomerRequests);
  // sort the cards from latest to earliest
  allCustomerRequests.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  allCustomerRequests.forEach((request) => {
    customerRequestsRender.push([
      <div className="mt-2">
        <Card>
          <h3 className="d-flex justify-content-center">
            {request.providerEmail}
          </h3>
          <div className="row">
            <span className="col-6">
              <strong>Date: </strong> {request.date}
            </span>
            <span className="col-6">
              <strong>Provider Accepted: </strong>{" "}
              {request.providerAccepted.toString()}
            </span>
            <span className="col-6">
              <strong>Job Completed: </strong>{" "}
              {request.serviceComplete.toString()}
            </span>
            <span className="col-6">
              <strong>Total Cost: </strong>
              {currencyFormatter.format(request.totalCost)}
            </span>
          </div>
        </Card>
      </div>,
    ]);
  });

  // form component
  return <div>{customerRequestsRender}</div>;
}

export default CustomerLaundryRequestDetails;
