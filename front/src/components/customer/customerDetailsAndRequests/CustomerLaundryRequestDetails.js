/* MICHAEL CHANG */
import { useContext, useEffect, useState, useRef } from "react";
import UserLoginContext from "../../../store/UserLoginContext";
import CustomerLaundryRequestCards from "./CustomerLaundryRequestCards";

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

// default loading when first rendering page
let refreshButton = "Loading...";

// component function
function CustomerLaundryRequestDetails(props) {
  //intialize useContext
  const userContext = useContext(UserLoginContext);
  const [allCustomerRequests, setAllCustomerRequests] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  function refreshData() {
    setAllCustomerRequests([]);
    setFetchData(!fetchData);
  }

  useEffect(() => {
    const getLaundryRequestData = async () => {
      if (userContext.userDetails.email !== undefined) {
        const temp = await allCustomerLaundryRequestsFetch({
          customerEmail: userContext.userDetails.email,
        });
        // sort the cards from latest to earliest
        temp.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

        for (let request of temp) {
          const response = await getProviderDetails({
            userType: "provider",
            email: request.providerEmail,
          });
          request.providerDetails = await response;
        }
        setAllCustomerRequests(temp);
      }
    };
    getLaundryRequestData();
  }, [userContext.userDetails.email, fetchData]);

  const customerRequestsRender = [];

  for (let request of allCustomerRequests) {
    customerRequestsRender.push(
      <CustomerLaundryRequestCards request={request} />
    );
  }

  // load button text
  if (allCustomerRequests.length > 0) {
    refreshButton = "Refresh";
  } else {
    refreshButton = "Loading...";
  }

  // request details component
  return (
    <div>
      <div>
        <button onClick={refreshData}>{refreshButton}</button>
      </div>
      {customerRequestsRender}
    </div>
  );
}

export default CustomerLaundryRequestDetails;
