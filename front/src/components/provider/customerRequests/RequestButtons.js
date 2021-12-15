//Daniel Lisko
import React from "react";
import PropTypes from "prop-types";

const RequestButtons = ({
  request,
  setCustomerRequest,
  customersRequests,
  accpetedRequest,
  setAcceptRequest,
  setShow,
  deleteID,
  setDeleteID,
  buttonModifiers,
  handlePromp,
}) => {
  /*----------Buttons obitoins for hanlding Customer Request-------------*/
  const handleAcceptClick = async () => {
    await buttonModifiers(request._id, "providerAccepted");
  };

  const handleRejectClick = async () => {
    handlePromp();
    setDeleteID(request._id);
    // await buttonModifiers(request._id, "serviceRejected");
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
            id="rejectBtn"
          >
            Reject
          </button>
        </div>,
      ];
    }
  };

  return <div className="row">{renderButtons()}</div>;
};

RequestButtons.propTypes = {
  sortRequests: PropTypes.string,
  customersRequests: PropTypes.array,
  setCustomerRequest: PropTypes.func,
  accpetedRequest: PropTypes.bool,
  setAcceptRequest: PropTypes.func,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setDeleteID: PropTypes.func,
  whichModal: PropTypes.bool,
  setWhichModal: PropTypes.func,
  buttonModifiers: PropTypes.func,
  handlePromp: PropTypes.func,
};

export default RequestButtons;
