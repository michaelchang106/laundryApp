import React from "react";
import { useState, useEffect } from "react";
import CustomerReqCard from "./requestCard.js";

const CustomerReqDetails = ({
  sortRequests,
  customersRequests,
  setCustomerRequest,
}) => {
  //Fetch all cusomter requests
  //Requires a String of the providers email.
  // const fetchCustomerRequest = async (emailStr) => {
  //   const emailObj = { providerEmail: emailStr };
  //   const res = await fetch("/api/allCustomerLaundryRequest", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(emailObj),
  //   });

  //   const allCustomerRequests = await res.json();

  //   return allCustomerRequests;
  // };

  const renderRequest = customersRequests.map((request, i) => {
    if (request.serviceRejected === undefined && !request.serviceComplete) {
      return (
        <CustomerReqCard
          key={request._id}
          request={request}
          setCustomerRequest={setCustomerRequest}
          customersRequests={customersRequests}
        />
      );
    } else {
      return "";
    }
  });

  // useEffect(() => {
  //   let tmpCustomerRequest;
  //   const getReq = async () => {
  //     tmpCustomerRequest = await fetchCustomerRequest(localStorage.email);
  //     sortRequests(tmpCustomerRequest);
  //     setCustomerRequest(tmpCustomerRequest);
  //   };

  //   getReq();
  // }, []);

  return <div className="row">{renderRequest}</div>;
};

export default CustomerReqDetails;
