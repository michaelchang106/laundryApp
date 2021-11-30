// DANIEL LISKO

import { useState, useEffect } from "react";

const EditService = ({
  serviceItem,
  modifyServiceDisplay,
  onServiceEdit,
  deleteService,
  submitEdit,
  services,
}) => {
  //Set up default service Options
  let [serviceOptions, setServiceOptions] = useState(new Set());

  //This will render every time we open create or decide to edit a service.
  useEffect(() => {
    updateServices();
  }, []);

  const updateServices = () => {
    let serviceOpt = new Set(["Wash", "Dry Clean", "Fold", "Delivery"]);
    services.forEach((service) => {
      if (serviceOpt.has(service.service)) {
        serviceOpt.delete(service.service);
      }
    });
    setServiceOptions(serviceOpt);
    console.log("=======>", serviceOptions);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Prevents user from submitting the default display.
    if (serviceItem.service === "") {
      return;
    }
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
    let options = new Set();
    //Filter options that are already being useing

    options.add(
      <option value="" disabled selected>
        Select a service
      </option>
    );

    if (serviceItem.service && !serviceOptions.has(serviceItem.service)) {
      options.add(
        <option value={serviceItem.service}>{serviceItem.service}</option>
      );
    }

    serviceOptions.forEach((serviceOpt) => {
      options.add(<option value={serviceOpt}>{serviceOpt}</option>);
    });

    return options;
  };

  const renderPerPoundBox = () => {
    let output;
    if (serviceItem.service === "Dry Clean" || serviceItem.service === "Wash") {
      //Checks return if service item IS charging per pound
      output = serviceItem.perPound ? (
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
            checked
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
      ) : (
        //Checks return if service item isn't charging per pound
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
    return output;
  };

  //-------------------To Render the Page--------

  return (
    <form key={serviceItem.serviceID} className="service" onSubmit={onSubmit}>
      <div>
        <label htmlFor="service">
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
          step="0.01"
          min="0"
          max="100"
          name="price"
          placeholder={serviceItem.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-12 d-flex justify-content-center">
        <button type="submit" value="Save" className="editBtn">
          Save
        </button>
        <button className="deleteBtn" onClick={handleOnDelete}>
          Delete
        </button>
      </div>
    </form>
  );
};

export default EditService;
