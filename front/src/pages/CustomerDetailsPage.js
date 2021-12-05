// MICHAEL CHANG

import CustomerDetailsForm from "../components/customer/customerDetailsAndRequests/CustomerDetailsForm";
import { useContext, useState } from "react";
import UserLoginContext from "../store/UserLoginContext";
import CustomerLaundryRequestDetails from "../components/customer/customerDetailsAndRequests/CustomerLaundryRequestDetails";

function CustomerDetailsPage() {
  //intialize useContext
  const userContext = useContext(UserLoginContext);
  const [getLaundryData, setGetLaundryData] = useState(false);

  function setGetLaundryDataFunc() {
    setGetLaundryData(!getLaundryData);
  }

  if (userContext.userDetails !== undefined) {
    return (
      <div>
        <h1>{`${userContext.userDetails.firstName} ${userContext.userDetails.lastName}`}</h1>
        <div className="row">
          <div className="col-6">
            <CustomerDetailsForm />
          </div>
          <div className="col-6">
            <h5>
              {userContext.userDetails.firstName}{" "}
              {userContext.userDetails.lastName} Laundry Requests
            </h5>
            <span>
              <button onClick={setGetLaundryDataFunc}>Refresh</button>
            </span>
            <CustomerLaundryRequestDetails getLaundryData={getLaundryData} />
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
