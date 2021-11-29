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
  let customerRequestsCards = [];
  let customerRequestsRender = [];
  //intialize useContext
  const userContext = useContext(UserLoginContext);
  const customerEmail = { customerEmail: userContext.userDetails.email };

  // fetch requeests from DB
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

  allCustomerLaundryRequestsFetch(customerEmail);

  allCustomerRequests.forEach((request) => {
    customerRequestsCards.push([
      <div className="mt-2">
        <Card>
          <h3 className="d-flex justify-content-center">
            {request.providerEmail}
          </h3>
          <div className="row">
            <span className="col-12">
              <strong>Date: </strong> {request.date}
            </span>
          </div>
          <div className="row">
            <span className="col-6">
              <strong>Total Cost: </strong>
              {currencyFormatter.format(request.totalCost)}
            </span>
          </div>
        </Card>
      </div>,
      request.date,
    ]);
  });

  // sort the cards from latest to earliest
  customerRequestsCards.sort((a, b) => b[1] - a[1]);

  // push to render array
  customerRequestsCards.forEach((card) => {
    customerRequestsRender.push(card[0]);
  });

  // form component
  return <div>{customerRequestsRender}</div>;
}

export default CustomerLaundryRequestDetails;
