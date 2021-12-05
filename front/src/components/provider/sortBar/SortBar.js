import React from "react";
import { useEffect } from "react";
import DisplayToggles from "./DisplayToggles.js";

const SortBar = ({
  setDisplayOptions,
  displayOptions,
  sortRequests,
  setCustomerRequest,
  customersRequests,
  setOrderDirection,
  orderDirection,
  fetchCustomerRequest,
}) => {
  const handleChange = (e) => {
    displayOptions.displayBy = e.target.value;
    setDisplayOptions(displayOptions);
    sortRequests(customersRequests);
    setCustomerRequest([...customersRequests]);
  };

  const handleRadio = async (e) => {
    let value = e.target.value; //Because HTML returns a string instead of a boolean

    if (value === "true") {
      value = true;
    } else {
      value = false;
    }
    setOrderDirection(value);
    sortRequests(customersRequests);
    setCustomerRequest([...customersRequests]);
  };

  useEffect(() => {
    console.log(orderDirection);
    sortRequests(customersRequests);
    setCustomerRequest([...customersRequests]);
  }, [orderDirection]); // Not sure I understand the warning. Things seem to work.

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
          <div onClick={handleRadio}>
            <div className="row">
              <div className="col-6 p-0">
                <input type="radio" value={true} name="sortBy" />
                <small htmlFor="sortBy">Asscend</small>
              </div>
              <div className="col-6 p-0">
                <input
                  type="radio"
                  value={false}
                  name="sortBy"
                  checked={!orderDirection}
                />
                <small htmlFor="sortBy">Descend</small>
              </div>
            </div>
          </div>
        </div>
        <DisplayToggles
          customersRequests={customersRequests}
          setCustomerRequest={setCustomerRequest}
          fetchCustomerRequest={fetchCustomerRequest}
          sortRequests={sortRequests}
        />
      </nav>
    </div>
  );
};

export default SortBar;
