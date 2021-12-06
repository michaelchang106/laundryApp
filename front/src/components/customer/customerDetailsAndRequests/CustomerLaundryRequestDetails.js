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
  // const customerEmail = { customerEmail: userContext.userDetails.email };
  const [allCustomerRequests, setAllCustomerRequests] = useState([]);

  useEffect(() => {
    const getLaundryRequestData = async () => {
      const temp = await allCustomerLaundryRequestsFetch({
        customerEmail: userContext.userDetails.email,
      });
      // sort the cards from latest to earliest
      temp.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

      temp.forEach(async (request) => {
        const response = await getProviderDetails({
          userType: "provider",
          email: request.providerEmail,
        });

        request.providerDetails = await response;
      });

      setAllCustomerRequests([...temp]);
    };

    getLaundryRequestData();
  }, [userContext.userDetails.email]);

  const customerRequestsRender = allCustomerRequests.map((request) => {
    console.log(request, "ENTIRE REQUEST OBJECT");
    console.log(request, "ENTIRE REQUEST OBJECT 2222");
    console.log(
      request.servicesRequested,
      "SERVICES REQUESTED FIELD, WHICH IS AN OBJECT"
    );
    console.log(
      request.providerDetails,
      "PROVIDER DETAILS FIELD, WHICH IS AN OBJECT"
    );

    return (
      <CustomerLaundryRequestCards
        providerDetails={request.providerDetails} // WHY IS THIS CAUSING ISSUES?
        date={request.date}
        providerEmail={request.providerEmail}
        providerAccepted={request.providerAccepted}
        serviceComplete={request.serviceComplete}
        totalCost={request.totalCost}
      />
    );
  });

  // request details component
  return <div>{customerRequestsRender}</div>;
}

export default CustomerLaundryRequestDetails;
export { allCustomerLaundryRequestsFetch };
