import React from "react";
import RequestButtons from "./RequestButtons.js";

const requestCard = ({ request, setCustomerRequest, customersRequests }) => {
  const servicesRequested = request.servicesRequested;

  const renderServices = () => {
    let listServices = new Set();

    for (const service in servicesRequested) {
      const serviceStr = service.charAt(0).toUpperCase() + service.slice(1);

      if (servicesRequested[service].perPound) {
        listServices.add(
          <li>
            <strong>{serviceStr}</strong>: ${servicesRequested[service].price}{" "}
            Per lb.
          </li>
        );
      } else {
        listServices.add(
          <li>
            <strong>{serviceStr}</strong>
          </li>
        );
      }
    }
    return listServices;
  };

  return (
    <div className="card col-4">
      <div className="card-body">
        <h5 className="card-title">{request.customerEmail}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Requested: {request.date}
        </h6>
        <h6 className="card-subtitle mt-4">Services Requested:</h6>

        <ul>{renderServices()}</ul>

        <p>
          <strong>Total Cost:</strong> ${request.totalCost}
        </p>
        <RequestButtons
          key={request._id}
          request={request}
          setCustomerRequest={setCustomerRequest}
          customersRequests={customersRequests}
        />
      </div>
    </div>
  );
};

export default requestCard;
