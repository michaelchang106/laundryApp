import Button from "./Button.js";
const Service = ({
  key,
  service,
  cost,
  displayServices,
  setDisplaySerivces,
  editServices,
  setEditServices,
}) => {
  //hanle edit button
  const onEditClick = () => {
    setEditServices(true);
  };
  //Details to display
  const details = (
    <div>
      <h5>
        Cost: $<span>{cost}</span>
      </h5>
      <div>
        <button className="editBtn" onClick={onEditClick}>
          Edit
        </button>
        <button className="deleteBtn">Delete</button>
      </div>
    </div>
  );

  return (
    <div key={key} className="service">
      <h5>
        {service}
        <Button
          setDisplaySerivces={setDisplaySerivces}
          displayServices={displayServices}
        />
      </h5>

      {displayServices && details}
    </div>
  );
};

export default Service;
