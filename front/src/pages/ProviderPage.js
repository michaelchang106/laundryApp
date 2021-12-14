// DANIEL LISKO

import { useState, useEffect } from "react";
import Services from "../components/provider/providerServices/Services.js";
import CustomerReqDetails from "../components/provider/customerRequests/CustomerReqDetails.js";
import SortBar from "../components/provider/sortBar/SortBar.js";

const ProviderPage = () => {
  //Used to delete items
  const [show, setShow] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const [whichModal, setWhichModal] = useState();

  //Initalize Customer Requests
  let [services, setServices] = useState([]);
  let [customersRequests, setCustomerRequest] = useState([]);
  let [accpetedRequest, setAcceptRequest] = useState(false);

  /*------------Set Display Options----------*/
  let [displayOptions, setDisplayOptions] = useState({
    displayBy: "requestDate",
  });

  //Sort by ascending or descending order
  let [orderDirection, setOrderDirection] = useState(false);

  /*-----------Load Service Requests----------*/ //Load storted services and requested services
  useEffect(() => {
    let tmpCustomerRequest;
    //Get services offered -> set display to false
    const loadServices = async () => {
      let services = await getProviderServices(localStorage.email);

      if (Object.keys(services).length === 0) {
        services = [];
      }
      setServices(services);
    };

    //Get Customer Request
    const getReq = async () => {
      tmpCustomerRequest = await fetchCustomerRequest(localStorage.email);
      sortRequests(tmpCustomerRequest);
      setCustomerRequest(tmpCustomerRequest);
    };
    getReq();
    loadServices();
  }, []);

  const sortRequests = (requests) => {
    switch (displayOptions.displayBy) {
      case "requestDate":
        if (orderDirection) {
          requests.sort((a, b) =>
            new Date(a.date) > new Date(b.date) ? 1 : -1
          );
        } else {
          requests.sort((a, b) =>
            new Date(a.date) < new Date(b.date) ? 1 : -1
          );
        }
        break;
      case "totalCharge":
        if (orderDirection) {
          requests.sort((a, b) => (a.totalCost > b.totalCost ? 1 : -1));
        } else {
          requests.sort((a, b) => (a.totalCost < b.totalCost ? 1 : -1));
        }
        break;

      default:
        console.log("No Case");
        break;
    }
  };

  //Changes the displays to either being visibile or not visibile
  const modifyServiceDisplay = (id, toModify, setBoolean) => {
    console.log("To Modifiy", toModify);
    let updated = services.map((service) => {
      let update;
      if (service.serviceID === id && setBoolean === undefined) {
        update = { ...service, [toModify]: !service[toModify] };
      } else {
        update = update = { ...service, [toModify]: service[setBoolean] };
      }

      return update;
    });

    setServices(updated);
  };

  //Handle Service Edits
  const onServiceEdit = (id, item, value) => {
    let updated = services.map((serviceItem) => {
      let update;
      if (serviceItem.serviceID === id) {
        update = { ...serviceItem, [item]: value };
      } else {
        update = serviceItem;
      }
      return update;
    });

    setServices(updated);
  };

  //----------Handling Post-----------------//
  const getProviderServices = async (email) => {
    const res = await fetch("/api/getServices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const resJSON = await res.json();

    return resJSON;
  };
  // Fetch all cusomter requests
  // Requires a String of the providers email.
  const fetchCustomerRequest = async (emailStr) => {
    const emailObj = { providerEmail: emailStr };
    const res = await fetch("/api/allCustomerLaundryRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailObj),
    });

    const allCustomerRequests = await res.json();

    return allCustomerRequests;
  };

  // Sending and Recieving services
  return (
    <div>
      <div>
        <h1>Your Service Request Headquarters...</h1>
        <div className="row">
          <div className="serviceDetails col-3">
            <h3>Services By You:</h3>
            <Services
              services={services}
              modifyServiceDisplay={modifyServiceDisplay}
              onServiceEdit={onServiceEdit}
              setServices={setServices}
              show={show}
              setShow={setShow}
              deleteID={deleteID}
              setDeleteID={setDeleteID}
              whichModal={whichModal}
              setWhichModal={setWhichModal}
            />
          </div>

          <div className="col-8" id="requestedServices">
            <SortBar
              setDisplayOptions={setDisplayOptions}
              displayOptions={displayOptions}
              sortRequests={sortRequests}
              setCustomerRequest={setCustomerRequest}
              customersRequests={customersRequests}
              orderDirection={orderDirection}
              setOrderDirection={setOrderDirection}
              fetchCustomerRequest={fetchCustomerRequest}
              accpetedRequest={accpetedRequest}
            />
            <CustomerReqDetails
              sortRequests={sortRequests}
              customersRequests={customersRequests}
              setCustomerRequest={setCustomerRequest}
              accpetedRequest={accpetedRequest}
              setAcceptRequest={setAcceptRequest}
              show={show}
              setShow={setShow}
              deleteID={deleteID}
              setDeleteID={setDeleteID}
              whichModal={whichModal}
              setWhichModal={setWhichModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderPage;
