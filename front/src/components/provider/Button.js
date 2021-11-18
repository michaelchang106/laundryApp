const Button = ({ displayServices, setDisplaySerivces }) => {
  const handleClick = () => {
    setDisplaySerivces(!displayServices);
  };

  return (
    <span>
      {displayServices ? (
        <button onClick={handleClick} className="collapseBtn">
          &#8722;
        </button>
      ) : (
        <button onClick={handleClick} className="collapseBtn">
          &#43;
        </button>
      )}
    </span>
  );
};

export default Button;
