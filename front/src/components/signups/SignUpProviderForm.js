import Card from "../ui/Card";
import "./SignUpProvide.css";
import { useState } from "react";

const SignUpProviderForm = ({ postProviderData }) => {
  const [providerInfo, setProviderInfo] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    password: "",
    confirmPassword: "",
  });

  console.log("provider", providerInfo);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setProviderInfo({ ...providerInfo, [name]: value });
  };

  //Hanle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target[0].value);
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
            />
          </div>
        </div>
        <h2>Address</h2>
        <div>
          <div className="fullLengthIn">
            <label htmlFor="address1">Address Line 1</label>
            <input
              name="address1"
              id="address1"
              type="text"
              onChange={handleChange}
            />
            <label htmlFor="address2">Address Line 2</label>
            <input
              name="address2"
              id="address2"
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
