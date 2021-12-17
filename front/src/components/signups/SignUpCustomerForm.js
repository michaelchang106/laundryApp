// MICHAEL CHANG

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import classes from "./SignUpCustomerForm.module.css";

function SignUpCustomerForm(props) {
  // state variables
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  // navigate variable
  const navigate = useNavigate();

  // reference varaibles
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const zipCodeRef = useRef();
  const stateRef = useRef();
  const phoneNumberRef = useRef();

  // onChange password && confirmPassword input handler
  const passwordChangeHandler = async (event) => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setPasswordErrorMessage("Passwords do not match!");
    } else {
      setPasswordErrorMessage("");
    }
  };

  //https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
  // onChange phoneNumber input handler
  const phoneNumberChangeHandler = async (event) => {
    const phoneNumber = phoneNumberRef.current.value;
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      phoneNumberRef.current.value = [
        match[2],
        "-",
        match[3],
        "-",
        match[4],
      ].join("");
    }
  };
  // onChange email input handler
  const emailChangeHandler = async (event) => {
    const email = emailRef.current.value;

    if (email.includes("@") && email.includes(".")) {
      const response = await props.findEmailFetch(email);

      if (response === null || response === undefined) {
        setEmailErrorMessage("");
      } else {
        setEmailErrorMessage("Email already registered please login!");
      }
    } else {
      return;
    }
  };

  // onSubmit customer form handler
  const customerSubmitHandler = async (event) => {
    event.preventDefault();

    const customerFirstName = firstNameRef.current.value;
    const customerLastName = lastNameRef.current.value;
    const customerEmail = emailRef.current.value;
    const customerPassword = passwordRef.current.value;
    const customerConfirmPassword = confirmPasswordRef.current.value;
    const customerAddress = addressRef.current.value;
    const customerCity = cityRef.current.value;
    const customerZipCode = zipCodeRef.current.value;
    const customerState = stateRef.current.value;
    const customerPhoneNumber = phoneNumberRef.current.value;

    if (customerPassword !== customerConfirmPassword) {
      setPasswordErrorMessage("Passwords do not match!");
      return;
    } else {
      setPasswordErrorMessage("");
      const customerData = {
        firstName: customerFirstName,
        lastName: customerLastName,
        email: customerEmail,
        address: customerAddress,
        city: customerCity,
        zipCode: customerZipCode,
        state: customerState,
        phoneNumber: customerPhoneNumber,
        password: customerPassword,
        userType: "customer",
      };

      const response = await props.createCustomerFetch(customerData);

      if (response) {
        setEmailErrorMessage("");
        navigate("/redirectHome");
      } else {
        setEmailErrorMessage("Email already registered please login!");
      }
    }
  };

  // form component
  return (
    <Card>
      <form className={classes.form} onSubmit={customerSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            required
            name="firstname"
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
            ref={lastNameRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="email@email.com"
            required
            name="email"
            ref={emailRef}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={classes.error}>
          <p>{emailErrorMessage}</p>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            ref={passwordRef}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter Password"
            required
            name="confirmPassword"
            ref={confirmPasswordRef}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.error}>
          <p>{passwordErrorMessage}</p>
        </div>

        <div className={classes.control}>
          <label htmlFor="addreess">City</label>
          <input
            type="text"
            placeholder="123 Address Street"
            required
            name="address"
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
            ref={cityRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="zipCode">Zip Code</label>
          <input
            // Xuejia Yang: It should be type="number" to make sense. I do see that you have specified a pattern, 
            //              but making type="number" may provide better user experience.
            type="text"
            pattern="[0-9]{5}"
            placeholder="Zip Code (eg. 12345)"
            required
            name="zipCode"
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
            ref={stateRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phoneNumber"
            // Xuejia Yang: Same things here. Please use type="number" instead?
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            required
            name="phone"
            ref={phoneNumberRef}
            onChange={phoneNumberChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <button>Create Account</button>
        </div>
      </form>
    </Card>
  );
}

export default SignUpCustomerForm;
