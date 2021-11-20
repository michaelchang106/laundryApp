const Button = ({ serviceItem, modifyServiceDisplay, id }) => {
  const handleClick = (e) => {
    modifyServiceDisplay(serviceItem.serviceID, "showDetails");
  };

  return (
    <span>
      {serviceItem.showDetails ? (
        <button id={id} onClick={handleClick} className="collapseBtn">
          &#8722;
        </button>
      ) : (
        <button id={id} onClick={handleClick} className="collapseBtn">
          &#43;
        </button>
      )}
    </span>
  );
};

export default Button;
