const EditService = ({
  serviceItem,
  modifyServiceDisplay,
  onServiceEdit,
  deleteService,
  submitEdit,
}) => {
  const serviceOptions = [
    "Wash and Fold",
    "Dress Pants",
    "Dresses",
    "Skirts",
    "Comforter/Duvet",
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    modifyServiceDisplay(serviceItem.serviceID, "showEdit");
    serviceItem.showEdit = false;
    submitEdit(serviceItem);
  };

  const handleInputChange = (e) => {
    const target = e.target;
    let value;
    if (target.name === "perPound") {
      if (target.value === "true") {
        value = false;
      } else {
        value = true;
      }
    } else {
      value = target.value;
    }

    console.log("Radio", target.value);
    onServiceEdit(serviceItem.serviceID, target.name, value);
  };

  const handleOnDelete = () => {
    deleteService(serviceItem.serviceID);
    modifyServiceDisplay(serviceItem.serviceID, "showEdit");
  };

  //Used to render options from dropdown service
  const renderOptions = serviceOptions.map((opt, i) => (
    <option value={opt}> {opt}</option>
  ));

  console.log("SertviceItm", serviceItem.perPound);
  return (
    <form key={serviceItem.serviceID} className="service" onSubmit={onSubmit}>
      <div>
        <label htmlFor="">
          <span>Select Service:</span>
        </label>
        <select
          name="service"
          onChange={handleInputChange}
          value={serviceItem.service}
        >
          {renderOptions}
        </select>
      </div>
      <div>
        <label htmlFor="">Fee:</label>
        <input
          type="number"
          name="price"
          placeholder={serviceItem.price}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          name="perPound"
          id={
            serviceItem.perPound
              ? "flexSwitchCheckChecked"
              : "flexSwitchCheckDefault"
          }
          value={serviceItem.perPound}
          onChange={handleInputChange}
        />
        <label
          className="form-check-label"
          htmlFor={
            serviceItem.perPound
              ? "flexSwitchCheckChecked"
              : "flexSwitchCheckDefault"
          }
        >
          Charge per Pound?
        </label>
      </div>

      <button type="submit" value="Save" className="editBtn">
        Save
      </button>
      <button className="deleteBtn" onClick={handleOnDelete}>
        Delete
      </button>
    </form>
  );
};

export default EditService;
