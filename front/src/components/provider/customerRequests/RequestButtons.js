import React from "react";

const RequestButtons = ({ request, setCustomerRequest, customersRequests }) => {
  /*Helper function to modify displays when a button is pressed*/
  const buttonModifiers = async (_id, toModify) => {
    let updated = customersRequests.map((req) => {
      let update;
      if (req._id === _id) {
        update = { ...req, [toModify]: !req[toModify] };
        pushRequestUpdate({ ...req, [toModify]: !req[toModify] }); //Send response to the database.
      } else {
        update = req;
      }
      return update;
    });

    customersRequests = updated;
    setCustomerRequest([...customersRequests]);
  };

  const pushRequestUpdate = async (toUpdate) => {
    await fetch("/api/updateCustomerRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toUpdate),
    });
  };

  /*----------Buttons obitoins for hanlding Customer Request-------------*/
  const handleAcceptClick = async () => {
    await buttonModifiers(request._id, "providerAccepted");
  };

  const handleRejectClick = async () => {
    await buttonModifiers(request._id, "serviceRejected");
  };

  const handleServCompleteClick = async () => {
    await buttonModifiers(request._id, "serviceComplete");
  };

  const renderButtons = () => {
    if (request.providerAccepted) {
      return (
        <button
          className="submitCompletedSrv"
          type="button"
          onClick={handleServCompleteClick}
        >
          Service Complete
        </button>
      );
    } else {
      return [
        <div className="col-6 p-1">
          <button
            className="acptRejBtn"
            type="button"
            onClick={handleAcceptClick}
          >
            Accept
          </button>
        </div>,
        <div className="col-6 p-1">
          <button
            className="acptRejBtn"
            type="button"
            onClick={handleRejectClick}
          >
            Reject
          </button>
        </div>,
      ];
    }
  };

  return <div className="row">{renderButtons()}</div>;
};

export default RequestButtons;
