import React from "react";
import CustomerReqCard from "./requestCard.js";
import ModalCheck from "../Modal/ModalCheck.js";

const CustomerReqDetails = ({
  sortRequests,
  customersRequests,
  setCustomerRequest,
  accpetedRequest,
  setAcceptRequest,
  show,
  setShow,
  deleteID,
  setDeleteID,
  whichModal,
  setWhichModal,
}) => {
  /*Helper function to modify displays when a button is pressed*/
  const buttonModifiers = async (_id, toModify) => {
    console.log("toModify");
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

  console.log("--->", buttonModifiers);
  let renderRequest = customersRequests.map((request, i) => {
    if (request.serviceRejected === undefined && !request.serviceComplete) {
      return (
        <CustomerReqCard
          key={request._id}
          request={request}
          setCustomerRequest={setCustomerRequest}
          customersRequests={customersRequests}
          accpetedRequest={accpetedRequest}
          setAcceptRequest={setAcceptRequest}
          show={show}
          setShow={setShow}
          setDeleteID={setDeleteID}
          buttonModifiers={buttonModifiers}
          whichModal={whichModal}
          setWhichModal={setWhichModal}
        />
      );
    } else {
      return null;
    }
  });

  return (
    <div className="row">
      {whichModal === "rejectCustomer" && (
        <ModalCheck
          key="M1"
          show={show}
          setShow={setShow}
          deleteID={deleteID}
          buttonModifiers={buttonModifiers}
          promptMessage={"Are you sure you want to reject this request?"}
          promptHeader={"Reject Customer Request Confirmation"}
        />
      )}
      {renderRequest}
    </div>
  );
};

export default CustomerReqDetails;
