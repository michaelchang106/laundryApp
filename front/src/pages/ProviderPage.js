// DANIEL LISKO

import { useState, useEffect } from "react";
import Services from "../components/provider/Services.js";

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
    let updated = services.map((serviceItem) => {
      let update;
      if (serviceItem.serviceID === id) {
        update = { ...serviceItem, [item]: value };
      } else {
        update = serviceItem;
      }
      return update;
    });

    setServices(updated);
  };

  //----------Handling Post-----------------//
  const getProviderServices = async (email) => {
    const res = await fetch("/api/getServices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const resJSON = await res.json();

    return resJSON;
  };

  // //Display only on page
  useEffect(() => {
    //Get services offered -> set display to false
    const loadServices = async () => {
      let services = await getProviderServices(localStorage.email);
      setServices(services);
    };
    loadServices();
  }, []);

  // Sending and Recieving services

  return (
    <div>
      <div>
        <h1>Provider Page</h1>
        <div className="row">
          <div className="serviceDetails col-3">
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
    </div>
  );
};

export default ProviderPage;
