import Button from "./Button.js";

const Service = ({
  key,
  serviceItem,
  modifyServiceDisplay,
  id,
  deleteService,
  setServices,
}) => {
  // handle edit button
  const onEditClick = () => {
    modifyServiceDisplay(serviceItem.serviceID, "showEdit");
  };

  const handleOnDelete = () => {
    deleteService(serviceItem.serviceID);
    modifyServiceDisplay(serviceItem.serviceID, "showEdit");
  };

  // //Details to display
  const details = (
    <div>
      <h5>
        Cost: $<span>{serviceItem.price}</span>
      </h5>
      <div>
        <button className="editBtn" onClick={onEditClick}>
          Edit
        </button>
        <button className="deleteBtn" onClick={handleOnDelete}>
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div key={key} className="service">
      <h5>
        <span className="serviceTitle">{serviceItem.service}</span>
        <Button
          serviceItem={serviceItem}
          modifyServiceDisplay={modifyServiceDisplay}
          id={id}
        />
      </h5>
      {serviceItem.showDetails && details}
    </div>
  );
};

export default Service;
