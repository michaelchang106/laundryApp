import EditService from "./EditService.js";
import "./providerPage.css";
import Service from "./Service";

const serviveItem = [
  { Service: "Wash", Price: 2.5, perPound: "No" },
  { Service: "Clean", Price: 2.0, perPound: "No" },
];

const Services = ({
  displayServices,
  setDisplaySerivces,
  editServices,
  setEditServices,
}) => {
  const renderServices = serviveItem.map((s, i) => {
    if (editServices) {
      return (
        <EditService
          key={i}
          service={s.Service}
          cost={s.Price}
          displayServices={displayServices}
          setEditServices={setEditServices}
        />
      );
    }

    return (
      <Service
        key={i}
        service={s.Service}
        cost={s.Price}
        displayServices={displayServices}
        setDisplaySerivces={setDisplaySerivces}
        editServices={editServices}
        setEditServices={setEditServices}
      />
    );
  });

  return <div>{renderServices}</div>;
};

export default Services;
