import React from "react";

const RequestButtons = ({
  request,
  setCustomerRequest,
  customersRequests,
  accpetedRequest,
  setAcceptRequest,
}) => {
  /*Helper function to modify displays when a button is pressed*/
  const buttonModifiers = async (_id, toModify) => {
    let updated = [];
    for (const req of customersRequests) {
      if (req._id === _id) {
        updated.push({ ...req, [toModify]: !req[toModify] });

        await pushRequestUpdate({ ...req, [toModify]: !req[toModify] });
        await setAcceptRequest(!accpetedRequest);
      } else {
        updated.push(req);
      }
    }

    setCustomerRequest([...updated]);
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
