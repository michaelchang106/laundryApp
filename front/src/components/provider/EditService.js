const EditService = ({
  serviceItem,
  modifyServiceDisplay,
  onServiceEdit,
  deleteService,
  submitEdit,
  services,
}) => {
  const serviceOptions = ["Wash", "Dry Clean", "Fold", "Delivery"];

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

    onServiceEdit(serviceItem.serviceID, target.name, value);
  };

  const handleOnDelete = () => {
    deleteService(serviceItem.serviceID);
    modifyServiceDisplay(serviceItem.serviceID, "showEdit");
  };

  //Used to render options from dropdown service
  const renderOptions = () => {
    let options = [];
    let used = new Set();

    // for (let item of services) {
    //   used.add(item.service);
    // }

    console.log("USED", used);

    serviceOptions.forEach((service) => {
      if (!used.has(service)) {
        options.push(<option value={service}>{service}</option>);
      }
    });

    return options;
  };

  const renderPerPoundBox = () => {
    if (serviceItem.service === "Dry Clean" || serviceItem.service === "Wash") {
      return (
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
      );
    }
    return "";
  };

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
          {renderOptions()}
        </select>
        <div className="d-flex justify-content-center">
          {renderPerPoundBox()}
        </div>
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
