//Daniel Lisko
import React from "react";
import RequestButtons from "./RequestButtons.js";

const requestCard = ({
  request,
  setCustomerRequest,
  customersRequests,
  accpetedRequest,
  setAcceptRequest,
  show,
  setShow,
  setDeleteID,
  buttonModifiers,
  setWhichModal,
}) => {
  const handlePromp = () => {
    setWhichModal("rejectCustomer");
    setShow(true);
  };
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
        <h2 className="card-title">{request.customerEmail}</h2>
        <h3 className="card-subtitle mb-2 text-muted">
          Requested: {request.date}
        </h3>
        <h3 className="card-subtitle mt-4">Services Requested:</h3>

        <ul>{renderServices()}</ul>

        <p>
          <strong>Total Cost:</strong> ${request.totalCost}
        </p>
        <RequestButtons
          request={request}
          show={show}
          setShow={setShow}
          setDeleteID={setDeleteID}
          setCustomerRequest={setCustomerRequest}
          customersRequests={customersRequests}
          accpetedRequest={accpetedRequest}
          setAcceptRequest={setAcceptRequest}
          buttonModifiers={buttonModifiers}
          handlePromp={handlePromp}
        />
      </div>
    </div>
  );
};

export default requestCard;
