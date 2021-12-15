// DANIEL LISKO

import Card from "../ui/Card";
import "./SignUpProvide.css";
import { useState, useRef } from "react";

const SignUpProviderForm = ({ postProviderData }) => {
  const [providerInfo, setProviderInfo] = useState({
    userType: "provider",
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    password: "",
    confirmPassword: "",
  });

  const phoneNumberRef = useRef();

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    //Format the number if it's missing the "-"
    if (event.target.name === "phoneNumber") {
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
      value = phoneNumberRef.current.value;
    }

    setProviderInfo({ ...providerInfo, [name]: value });
  };

  console.log(providerInfo);

  //Hanle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    postProviderData(providerInfo);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Contact Info</h2>
        <div className="fullLengthIn">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            placeholder="Enter Company Name"
            value={providerInfo.companyName}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="inline">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={providerInfo.firstName}
              id="firstName"
              placeholder="Enter First Name"
              onChange={handleChange}
            />
          </div>
          <div className="inline">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={providerInfo.lastName}
              id="lastName"
              placeholder="Enter Last Name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div className="inline">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </div>
          <div className="inline">
            <label htmlFor="phoneNumber">Phone</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="XXX-XXX-XXXX"
              onChange={handleChange}
              ref={phoneNumberRef}
            />
          </div>
        </div>
        <h2>Address</h2>
        <div>
          <div className="fullLengthIn">
            <label htmlFor="address">Address Line</label>
            <input
              name="address"
              id="address1"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="inline">
            <label htmlFor="city">City</label>
            <input name="city" id="city" type="text" onChange={handleChange} />
          </div>
          <div className="inline">
            <label htmlFor="state">State</label>
            <input
              name="state"
              id="state"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="zipCode">Zip Code</label>
          </div>
          <input
            name="zipCode"
            id="zipCode"
            type="number"
            onChange={handleChange}
          />
        </div>
        <h2>Password</h2>

        <div>
          <div className="inline">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className="inline">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex-parent jc-center">
          <button type="submit">Create Account</button>
        </div>
      </form>
    </Card>
  );
};

export default SignUpProviderForm;
