import React from "react";

const sortBar = ({
  setDisplayOptions,
  displayOptions,
  sortRequests,
  setCustomerRequest,
  customersRequests,
}) => {
  const handleChange = async (e) => {
    displayOptions.displayBy = e.target.value;
    setDisplayOptions(displayOptions);
    sortRequests(customersRequests);
    setCustomerRequest([...customersRequests]);
  };

  return (
    <div className="row">
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <label className="navbar-brand">Sort By:</label>
        <div className="col-2.5">
          <select
            className="form-control"
            id="inlineFormCustomSelect"
            onChange={handleChange}
          >
            <option value="requestDate">Date Requested</option>
            <option value="totalCharge">Total Cost</option>
          </select>
        </div>
      </nav>
    </div>
  );
};

export default sortBar;
