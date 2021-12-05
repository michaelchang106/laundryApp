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

  return await response.json();
};

const getProviderDetails = async (data) => {
  const response = await fetch("/api/findUserDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

// component function
function CustomerLaundryRequestDetails(props) {
  //intialize useContext
  const userContext = useContext(UserLoginContext);
  const customerEmail = { customerEmail: userContext.userDetails.email };

  const getLaundryRequestData = async () => {
    allCustomerRequests = await allCustomerLaundryRequestsFetch(customerEmail);
  };
  getLaundryRequestData();

  // sort the cards from latest to earliest
  allCustomerRequests.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  allCustomerRequests.forEach(async (request) => {
    const temp = await getProviderDetails({
      userType: "provider",
      email: request.providerEmail,
    });

    customerRequestsRender.push(
      <div className="mt-2">
        <Card>
          <h3 className="d-flex justify-content-center">{temp.companyName}</h3>
          <div className="row">
            <span className="col-12">
              <strong>Date: </strong> {request.date}
            </span>
            <span className="col-6">
              <strong>Email: </strong> {request.providerEmail}
            </span>
            <span className="col-6">
              <strong>Phone: </strong> {temp.phoneNumber}
            </span>
            <span className="col-6">
              <strong>Address: </strong> {temp.address}
            </span>
            <span className="col-6">
              <strong>City: </strong> {temp.city}
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
      </div>
    );
  });

  useEffect(() => {
    // reset array for card render
    customerRequestsRender = [];
  }, [props.getLaundryData, userContext.userDetails.email]);

  console.log(customerRequestsRender);

  // request details component
  return <div>{customerRequestsRender}</div>;
}

export default CustomerLaundryRequestDetails;
export { allCustomerLaundryRequestsFetch };
