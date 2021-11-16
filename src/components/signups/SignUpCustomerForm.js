import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./SignUpCustomerForm.module.css";

function SignUpCustomerForm(props) {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const phoneNumberRef = useRef();

  function customerSubmitHandler(event) {
    event.preventDefault();

    const customerFirstName = firstNameRef.current.value;
    const customerLastName = lastNameRef.current.value;
    const customerEmail = emailRef.current.value;
    const customerPassword = passwordRef.current.value;
    const customerCity = cityRef.current.value;
    const customerState = stateRef.current.value;
    const customerPhoneNumber = phoneNumberRef.current.value;

    const customerData = {
      firstName: customerFirstName,
      lastName: customerLastName,
      email: customerEmail,
      city: customerCity,
      state: customerState,
      phoneNumber: customerPhoneNumber,
    };

    const customerLoginData = {
      email: customerEmail,
      password: customerPassword,
    };

    props.onCreateCustomer(customerData);
    props.onCreateLogin(customerLoginData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={customerSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="firstname">First Name</label>
          <input type="text" placeholder="First Name" required id="firstname" />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" placeholder="Last Name" required id="lastname" />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="email@email.com"
            required
            id="email"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            id="password"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input type="text" placeholder="City Name" required id="city" />
        </div>
        <div className={classes.control}>
          <label htmlFor="state">State</label>
          <input type="text" placeholder="State Name" required id="state" />
        </div>
        <div className={classes.control}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            required
            id="phone"
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
