const Service = ({ service, cost, displayServices, setEditServices }) => {
  const handleSaveClick = () => {
    setEditServices(false);
  };

  return (
    <div className="service">
      <div>
        <label htmlFor="">
          <span>Select Service:</span>
        </label>
        <input type="text" placeholder={service} />
      </div>
      <div>
        <label htmlFor="">Fee:</label>
        <input type="number" placeholder={cost} />
      </div>
      <div>
        <input
          type="checkbox"
          className="custom-control-input"
          id="customSwitch1"
        />
        <label className="custom-control-label" htmlFor="customSwitch1">
          Price Per Pound
        </label>
      </div>
      <button className="editBtn" onClick={handleSaveClick}>
        Save
      </button>
      <button className="deleteBtn">Delete</button>
    </div>
  );
};

export default Service;
