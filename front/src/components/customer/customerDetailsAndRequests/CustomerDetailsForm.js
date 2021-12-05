/* MICHAEL CHANG */

import PropTypes from "prop-types";
import Card from "../../ui/Card";
import classes from "./CustomerDetailsForm.module.css";
import { useState, useRef } from "react";
import { useContext } from "react";
import UserLoginContext from "../../../store/UserLoginContext";

function CustomerDetailsForm() {
  const [formEdit, setFormEdit] = useState(true);
  const [buttonText, setButtonText] = useState("Edit");
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const zipCodeRef = useRef();
  const stateRef = useRef();
  const phoneNumberRef = useRef();

  //intialize useContext
  const userContext = useContext(UserLoginContext);

  // fetch to update userDetails in DB
  const updateUserDetailsFetch = async (data) => {
    await fetch("/api/updateUserDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const buttonClickHandler = (event) => {
    event.preventDefault();

    const customerFirstName = firstNameRef.current.value;
    const customerLastName = lastNameRef.current.value;
    const customerAddress = addressRef.current.value;
    const customerCity = cityRef.current.value;
    const customerZipCode = zipCodeRef.current.value;
    const customerState = stateRef.current.value;
    const customerPhoneNumber = phoneNumberRef.current.value;

    if (!formEdit && buttonText === "Save") {
      const customerDataChanged = {
        firstName: customerFirstName,
        lastName: customerLastName,
        address: customerAddress,
        city: customerCity,
        zipCode: customerZipCode,
        state: customerState,
        phoneNumber: customerPhoneNumber,
        email: userContext.userDetails.email,
        userType: userContext.userDetails.userType,
      };

      updateUserDetailsFetch(customerDataChanged);
      userContext.setUserDetails({
        ...userContext.userDetails,
        ...customerDataChanged,
      });
    }

    if (formEdit) {
      setFormEdit(false);
      setButtonText("Save");
    } else {
      setFormEdit(true);
      setButtonText("Edit");
    }
  };

  // form component
  return (
    <Card>
      <form className={classes.form} onSubmit={buttonClickHandler}>
        <div className={classes.control}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            required
            name="firstname"
            defaultValue={userContext.userDetails.firstName}
            disabled={formEdit}
            ref={firstNameRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            required
            name="lastname"
            defaultValue={userContext.userDetails.lastName}
            disabled={formEdit}
            ref={lastNameRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="123 Address Street"
            required
            name="address"
            defaultValue={userContext.userDetails.address}
            disabled={formEdit}
            ref={addressRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            placeholder="City Name"
            required
            name="city"
            defaultValue={userContext.userDetails.city}
            disabled={formEdit}
            ref={cityRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            pattern="[0-9]{5}"
            placeholder="Zip Code (eg. 12345)"
            required
            name="zipCode"
            defaultValue={userContext.userDetails.zipCode}
            disabled={formEdit}
            ref={zipCodeRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="state">State</label>
          <input
            type="text"
            pattern="(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])"
            placeholder="State Abbreviation (eg. CA, NY, AZ, etc.)"
            required
            name="state"
            defaultValue={userContext.userDetails.state}
            disabled={formEdit}
            ref={stateRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            required
            name="phone"
            defaultValue={userContext.userDetails.phoneNumber}
            disabled={formEdit}
            ref={phoneNumberRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{buttonText}</button>
        </div>
      </form>
    </Card>
  );
}

CustomerDetailsForm.propTypes = {
  getLaundryData: PropTypes.bool,
};

export default CustomerDetailsForm;
