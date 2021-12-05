import React from "react";
import { useState, useEffect } from "react";
import CustomerReqCard from "./requestCard.js";

const CustomerReqDetails = ({
  sortRequests,
  customersRequests,
  setCustomerRequest,
}) => {
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

  return <div className="row">{renderRequest}</div>;
};

export default CustomerReqDetails;
