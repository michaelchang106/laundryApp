const Service = ({
  serviceItem,
  modifyServiceDisplay,
  onServiceEdit,
  deleteService,
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
  };

  const handleInputChange = (e) => {
    const target = e.target;
    console.log(target.value);
    if (target.name === "perPound") {
      if (target.value === "true") {
        target.value = false;
      } else {
        target.value = true;
      }
    }
    onServiceEdit(serviceItem.serviceID, target.name, target.value);
  };

  const handleOnDelete = () => {
    console.log("Dlete");
    deleteService(serviceItem.serviceID);
  };

  //Used to render options from dropdown service
  const renderOptions = serviceOptions.map((opt, i) => (
    <option value={opt}> {opt}</option>
  ));

  return (
    <form className="service" onSubmit={onSubmit}>
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
      <div>
        <input
          type="checkbox"
          className="custom-control-input"
          name="perPound"
          value={serviceItem.perPound}
          onChange={handleInputChange}
        />
        <label id="perPoundCheckLbl" htmlFor="customSwitch1">
          Price Per Pound
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

export default Service;
