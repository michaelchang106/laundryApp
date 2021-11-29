/* MICHAEL CHANG */
import Card from "../../ui/Card";
import { useContext, useEffect } from "react";
import UserLoginContext from "../../../store/UserLoginContext";
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let allCustomerRequests = [];
let customerRequestsRender = [];

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

// component function
function CustomerLaundryRequestDetails(props) {
  //intialize useContext
  const userContext = useContext(UserLoginContext);

  useEffect(() => {
    const customerEmail = { customerEmail: userContext.userDetails.email };

    // reset array for card render
    customerRequestsRender = [];

    const getData = async () => {
      await allCustomerLaundryRequestsFetch(customerEmail);
    };
    getData();

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
  }, [props.getLaundryData, userContext.userDetails.email]);

  // form component
  return <div>{customerRequestsRender}</div>;
}

export default CustomerLaundryRequestDetails;
export { allCustomerLaundryRequestsFetch };
