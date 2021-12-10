/* MICHAEL CHANG */
import { useContext, useEffect, useState } from "react";
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
  const response = await fetch("/api/findAllUserDetails", {
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

        // create set for duplicate handling
        let listOfProviderEmails = new Set();
        for (let request of temp) {
          listOfProviderEmails.add(request.providerEmail);
        }

        // convert the set to list
        listOfProviderEmails = Array.from(listOfProviderEmails);

        // get all the providers details from mongo
        const response = await getProviderDetails({
          userType: "provider",
          email: listOfProviderEmails,
        });

        // add the details to each request
        temp.forEach((request) => {
          for (let provider of response) {
            if (provider.email === request.providerEmail) {
              request.providerDetails = provider;
            }
          }
        });

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
