// DANIEL LISKO

import EditService from "./EditService.js";
import "../providerPage.css";
import Service from "./Service";
import ModalCheck from "../Modal/ModalCheck.js";

const Services = ({
  services,
  setServices,
  modifyServiceDisplay,
  onServiceEdit,
  show,
  setShow,
  deleteID,
  setDeleteID,
  whichModal,
  setWhichModal,
}) => {
  const handlePromp = () => {
    setWhichModal("deleteService");
    setShow(true);
  };

  console.log("Which Modal", whichModal);

  //Used to delete a service
  const deleteService = async (id) => {
    let i = 0;
    for (const s of services) {
      if (s.serviceID === id) {
        services.splice(i, 1);
        //NEED TO RESET SERVICE ID AFTER DELETING.
        for (let i = 0; i < services.length; i++) {
          services[i].serviceID = i;
        }
        await postService(services);
      }

      i += 1;
    }

    setServices([...services]);
  };

  const addService = () => {
    console.log("ID =>", services.length);
    const newService = {
      service: "",
      price: 0.0,
      perPound: false,
      serviceID: services.length,
      showDetails: false,
      showEdit: true,
    };
    setServices([...services, newService]);
  };

  const submitEdit = async (service) => {
    await postService([...services, service]);
  };

  const postService = async (services) => {
    const res = await fetch("/api/updateServices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.email, services: services }),
    });
  };

  const renderServices = services.map((s, i) => {
    console.log(s);
    if (s.showEdit) {
      return (
        <EditService
          key={s.serviceID}
          services={services}
          serviceItem={s}
          modifyServiceDisplay={modifyServiceDisplay}
          onServiceEdit={onServiceEdit}
          handlePromp={handlePromp}
          submitEdit={submitEdit}
          setDeleteID={setDeleteID}
        />
      );
    }

    return (
      <Service
        key={s.serviceID}
        id={i}
        serviceItem={s}
        modifyServiceDisplay={modifyServiceDisplay}
        handlePromp={handlePromp}
        setDeleteID={setDeleteID}
      />
    );
  });

  const renderModal = () => {
    let toRender;
    if (whichModal === "deleteService") {
      toRender = [
        <ModalCheck
          key="M0"
          show={show}
          setShow={setShow}
          deleteService={deleteService}
          modifyServiceDisplay={modifyServiceDisplay}
          deleteID={deleteID}
        />,
      ];
    }

    return toRender;
  };

  return (
    <div>
      {renderModal()}
      <div>{renderServices}</div>
      <div>
        <small> Services Remaining: {4 - services.length}</small>
      </div>

      <div className="d-flex justify-content-center">
        {services.length < 4 && (
          <button onClick={addService}>Add Service</button>
        )}{" "}
      </div>
    </div>
  );
};

export default Services;
