import React from "react";

const RequestButtons = ({ request, setRequest, customersRequests }) => {
  /*Helper function to modify displays when a button is pressed*/
  const buttonModifiers = (_id, toModify) => {
    let updated = customersRequests.map((req) => {
      let update;
      if (req._id === _id) {
        update = { ...req, [toModify]: !req[toModify] };
      } else {
        update = req;
      }

      return update;
    });
    setRequest(updated);
  };

  const hangleAcceptClick = () => {
    buttonModifiers(request._id, "providerAccepted");
  };

  const hangleRejectClick = () => {
    buttonModifiers(request._id, "serviceRejected");
  };

  const hangleServCompleteClick = () => {
    buttonModifiers(request._id, "serviceComplete");
  };

  const renderButtons = () => {
    if (request.providerAccepted) {
      return (
        <button
          className="submitCompletedSrv"
          type="button"
          onClick={hangleServCompleteClick}
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
            onClick={hangleAcceptClick}
          >
            Accept
          </button>
        </div>,
        <div className="col-6 p-1">
          <button
            className="acptRejBtn"
            type="button"
            onClick={hangleRejectClick}
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
