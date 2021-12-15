// DANIEL LISKO
import PropTypes from "prop-types";
const Button = ({ serviceItem, modifyServiceDisplay, id }) => {
  const handleClick = (e) => {
    modifyServiceDisplay(serviceItem.serviceID, "showDetails");
  };

  return (
    <span className="col-4 d-flex justify-content-center align-items-center">
      {serviceItem.showDetails ? (
        <button
          id={id}
          onClick={handleClick}
          className="collapseBtn"
          aria-label="Expand Service Button"
        >
          &#8722;
        </button>
      ) : (
        <button
          id={id}
          onClick={handleClick}
          aria-label="Collapse Service Button"
          className="collapseBtn"
        >
          &#43;
        </button>
      )}
    </span>
  );
};

Button.propTypes = {
  modifyServiceDisplay: PropTypes.func,
};
export default Button;
