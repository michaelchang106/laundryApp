import { useState, useEffect } from "react";
import Services from "../components/provider/Services.js";

const serviveItems = [
  {
    service: "Dresses",
    price: 2.5,
    perPound: false,
    serviceID: 0,
    showDetails: false,
    showEdit: false,
  },
  {
    service: "Skirts",
    price: 2.0,
    perPound: false,
    serviceID: 1,
    showDetails: false,
    showEdit: false,
  },
];

const ProviderPage = () => {
  let [services, setServices] = useState([]);

  //Changes the displays to either being visibile or not visibile
  const modifyServiceDisplay = (id, toModify) => {
    let updated = services.map((service) => {
      let update;
      if (service.serviceID === id) {
        update = { ...service, [toModify]: !service[toModify] };
      } else {
        update = service;
      }

      return update;
    });

    setServices(updated);
  };

  //Handle Service Edits
  const onServiceEdit = (id, item, value) => {
    let updated = services.map((service) => {
      let update;
      if (service.serviceID === id) {
        update = { ...service, [item]: value };
      } else {
        update = service;
      }

      return update;
    });

    setServices(updated);
  };
  // //Display only on page
  useEffect(() => {
    //Get services offered -> set display to false
    const loadServices = (services) => {
      setServices(services);
    };
    loadServices(serviveItems);
  }, []);

  // Sending and Recieving services

  return (
    <div>
      <div>
        <h1>Provider Page</h1>
        <div className="serviceDetails">
          <h3>Services By You:</h3>
          <Services
            services={services}
            modifyServiceDisplay={modifyServiceDisplay}
            onServiceEdit={onServiceEdit}
            setServices={setServices}
          />
        </div>
      </div>
    </div>
  );
};

export default ProviderPage;
