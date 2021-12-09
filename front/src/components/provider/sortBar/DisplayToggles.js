import React from "react";
import { useState, useEffect } from "react";

const DisplayToggles = ({
  customersRequests,
  setCustomerRequest,
  fetchCustomerRequest,
  sortRequests,
  accpetedRequest,
}) => {
  //Display all, only accepted, or need responded requests
  let [showRequest, setShowRequest] = useState("showAll");

  console.log("Outside Render");
  useEffect(() => {
    filterRequest();
    console.log("Inside Effect");
  }, [showRequest, accpetedRequest]);

  const handleChange = async (e) => {
    setShowRequest(e.target.value);
  };

  const filterRequest = async () => {
    console.log("Running Filter");
    let reqData = await fetchCustomerRequest(localStorage.email);

    switch (showRequest) {
      case "needResponse":
        reqData = reqData.filter(
          (a) => a.providerAccepted === false && a.serviceRejected === undefined
        );
        break;
      case "accepted":
        reqData = reqData.filter(
          (a) => a.serviceComplete === false && a.providerAccepted === true
        );
        break;
      default:
        // statements_def
        break;
    }

    sortRequests(reqData);
    setCustomerRequest([...reqData]);
  };
  return (
    <div className="col-8 d-flex justify-content-end">
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
        onChange={handleChange}
      >
        <input
          type="radio"
          className="btn-check"
          name="btnDisplay"
          value="needResponse"
          id="btnDisplay1"
          checked={showRequest === "needResponse" ? true : false}
          autoComplete="off"
        />
        <label className="btn btn-outline-primary" htmlFor="btnDisplay1">
          Need Response
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnDisplay"
          value="accepted"
          id="btnDisplay2"
          checked={showRequest === "accepted" ? true : false}
          autoComplete="off"
        />
        <label className="btn btn-outline-primary" htmlFor="btnDisplay2">
          Accepted
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnDisplay"
          id="btnDisplay3"
          value="showAll"
          checked={showRequest === "showAll" ? true : false}
          autoComplete="off"
        />
        <label className="btn btn-outline-primary" htmlFor="btnDisplay3">
          Show All
        </label>
      </div>
    </div>
  );
};

export default DisplayToggles;
