// DANIEL LISKO

import Button from "./Button.js";

const Service = ({
  serviceItem,
  modifyServiceDisplay,
  id,
  handlePromp,
  setServices,
  setDeleteID,
}) => {
  // handle edit button
  const onEditClick = () => {
    modifyServiceDisplay(serviceItem.serviceID, "showEdit");
  };

  const handleOnDelete = () => {
    handlePromp(id);
    setDeleteID(id);
  };

  // //Details to display
  const details = (
    <div>
      <div className="row">
        <div className="col-7 pl-0">
          <h6>
            Cost: $<span>{serviceItem.price}</span>
          </h6>
        </div>
        <div className="col-5 d-flex justify-content-end">
          {serviceItem.perPound && <h6>Per lb.</h6>}
        </div>
      </div>
      <div className="row ">
        <div className="col-12 d-flex justify-content-center">
          <button className="editBtn" onClick={onEditClick}>
            Edit
          </button>
          <button className="deleteBtn" onClick={handleOnDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div key={serviceItem.serviceID} className="service row">
      <h5 className="serviceTitle col-8 pb-0">
        <span>{serviceItem.service}</span>
      </h5>
      <Button
        serviceItem={serviceItem}
        modifyServiceDisplay={modifyServiceDisplay}
        id={id}
      />
      {serviceItem.showDetails && details}
    </div>
  );
};

export default Service;
