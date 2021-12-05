// MICHAEL CHANG
import classes from "./LaundryCustomerConfirm.module.css";
import { useState } from "react";

function LaundryCustomerConfirm(props) {
  // data fetch
  const laundryCustomerConfirmFetch = async (data) => {
    await fetch("/api/laundryCustomerConfirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  // submit handler
  const laundryCustomerConfirmSubmitHandler = async (event) => {
    event.preventDefault();
    laundryCustomerConfirmFetch(requestObject);
    setButtonText("Pending");
  };

  const [buttonText, setButtonText] = useState("Choose Provider!");

  let washPrice;
  let poundsRequestedWash;
  let dryCleanPrice;
  let poundsRequesteddryClean;
  let deliveryPrice;
  let foldPrice;

  let requestObject = {};
  let servicesRequestedObject = {};

  if (props.servicesRequested.wash !== "") {
    washPrice = props.provider.serviceObjects.wash.price;
    poundsRequestedWash = parseFloat(props.servicesRequested.wash);
    servicesRequestedObject["wash"] = {
      price: washPrice,
      perPound: true,
      poundsRequested: poundsRequestedWash,
    };
  }

  if (props.servicesRequested.dryClean !== "") {
    dryCleanPrice = props.provider.serviceObjects.dryClean.price;
    poundsRequesteddryClean = parseFloat(props.servicesRequested.dryClean);
    servicesRequestedObject["dryClean"] = {
      price: dryCleanPrice,
      perPound: true,
      poundsRequested: poundsRequesteddryClean,
    };
  }

  if (props.servicesRequested.delivery) {
    deliveryPrice = props.provider.serviceObjects.delivery.price;
    servicesRequestedObject["delivery"] = {
      price: deliveryPrice,
      perPound: false,
    };
  }

  if (props.servicesRequested.fold) {
    foldPrice = props.provider.serviceObjects.fold.price;
    servicesRequestedObject["fold"] = {
      price: foldPrice,
      perPound: false,
    };
  }

  requestObject["servicesRequested"] = servicesRequestedObject;
  requestObject["totalCost"] = props.totalCost;
  requestObject["serviceComplete"] = false;
  requestObject["date"] = props.servicesRequested.date;
  requestObject["providerAccepted"] = false;
  requestObject["customerEmail"] = props.customer.email;
  requestObject["providerEmail"] = props.provider.email;

  // form component
  return (
    <div className="d-flex justify-content-end m-0">
      <form
        className={classes.actions}
        onSubmit={laundryCustomerConfirmSubmitHandler}
      >
        <button>{buttonText}</button>
      </form>
    </div>
  );
}

export default LaundryCustomerConfirm;
