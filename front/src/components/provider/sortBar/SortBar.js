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
  accpetedRequest,
  setAcceptRequest,
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <label className="navbar-brand" htmlFor="SelectHowtoSort">
          Sort By:
        </label>
        <div className="col-2.5">
          <select
            title="Sort by date or by total price"
            className="form-control"
            id="SelectHowtoSort"
            onChange={handleChange}
          >
            <option
              name="RequestDate"
              aria-label="Sort By Date"
              value="requestDate"
            >
              Date Requested
            </option>
            <option
              name="RequestDate"
              aria-label="Sort By Cost"
              value="totalCharge"
            >
              Total Cost
            </option>
          </select>
          <div onChange={handleRadio}>
            <div className="row">
              <div className="col-6 p-0">
                <input
                  type="radio"
                  value={true}
                  name="sortBy"
                  aria-label="Ascending Order"
                />
                <label htmlFor="sortBy" className="sortRadio">
                  Ascend
                </label>
              </div>
              <div className="col-6 p-0">
                <input
                  type="radio"
                  value={false}
                  name="sortBy"
                  checked={!orderDirection}
                  aria-label="Descending Order"
                />
                <label htmlFor="sortBy" className="sortRadio">
                  Descend
                </label>
              </div>
            </div>
          </div>
        </div>
        <DisplayToggles
          customersRequests={customersRequests}
          setCustomerRequest={setCustomerRequest}
          fetchCustomerRequest={fetchCustomerRequest}
          sortRequests={sortRequests}
          accpetedRequest={accpetedRequest}
        />
      </nav>
    </div>
  );
};

export default SortBar;
