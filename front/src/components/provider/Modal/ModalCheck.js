import { Button, Modal } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";

const ModalCheck = ({
  setShow,
  show,
  deleteService,
  deleteID,
  buttonModifiers,
  promptMessage,
  promptHeader,
}) => {
  const handleClose = () => setShow(false);

  const handleConfirmDel = async () => {
    console.log("Confirm", deleteService);
    console.log("ID TO DELETE", deleteID);

    setShow(false);
    if (deleteService !== undefined) {
      deleteService(deleteID);
    } else if (buttonModifiers !== undefined) {
      console.log("ID --->", deleteID);
      buttonModifiers(deleteID, "serviceRejected");
    } else {
      throw new Error("Not a function of ModalCheck");
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{promptHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{promptMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmDel}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalCheck.propTypes = {
  setShow: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  deleteService: PropTypes.func,
  buttonModifiers: PropTypes.func,
};

ModalCheck.defaultProps = {
  promptMessage: "Are you sure you want to delete this?",
  promptHeader: "Delete Confirmation",
};

export default ModalCheck;
