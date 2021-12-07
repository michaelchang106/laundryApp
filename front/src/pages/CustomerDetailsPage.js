// MICHAEL CHANG

import CustomerDetailsForm from "../components/customer/customerDetailsAndRequests/CustomerDetailsForm";
import { useContext } from "react";
import UserLoginContext from "../store/UserLoginContext";
import CustomerLaundryRequestDetails from "../components/customer/customerDetailsAndRequests/CustomerLaundryRequestDetails";

function CustomerDetailsPage() {
  //intialize useContext
  const userContext = useContext(UserLoginContext);

  if (userContext.userDetails !== undefined) {
    return (
      <div>
        <h1>{`${userContext.userDetails.firstName} ${userContext.userDetails.lastName}`}</h1>
        <div className="row">
          <div className="col-6">
            <CustomerDetailsForm />
          </div>
          <div className="col-6">
            <h2>
              {userContext.userDetails.firstName}{" "}
              {userContext.userDetails.lastName} Laundry Requests
            </h2>
            <CustomerLaundryRequestDetails />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Customer Details Page</h1>
    </div>
  );
}

export default CustomerDetailsPage;
