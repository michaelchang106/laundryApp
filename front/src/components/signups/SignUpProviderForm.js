import Card from "../ui/Card";
import "./SignUpProvide.css";
// import { useState } from "react";

const SignUpProviderForm = () => {
  //Which is the initial state, and returns two values:
  //1) the current state and a 2)function that can be used to update the state.

  //Sets the user info w/o password
  // let [userInfo, setUserInfo] = useState({
  //   companyName: "",
  //   firstName: "",
  //   lastName: "",
  //   address: "",
  //   city: "",
  //   phone: "",
  //   zipCode: null,
  //   userName: "",
  // });

  //Sets user login credentials (password, userType, userName)
  // let [loginCredential, setloginCredential] = useState();

  return (
    <Card>
      <form>
        <h2>Contact Info</h2>
        <div className="fullLengthIn">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Enter Company Name"
          />
        </div>
        <div>
          <div className="inline">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
            />
          </div>
          <div className="inline">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" placeholder="Enter Last Name" />
          </div>
        </div>
        <div>
          <div className="inline">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Enter Email" />
          </div>
          <div className="inline">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="XXX-XXX-XXXX"
            />
          </div>
        </div>
        <h2>Address</h2>
        <div>
          <div className="fullLengthIn">
            <label htmlFor="address1">Address Line 1</label>
            <input name="address1" type="text" />
            <label htmlFor="address2">Address Line 2</label>
            <input name="address2" type="text" />
          </div>

          <div className="inline">
            <label htmlFor="city">City</label>
            <input name="city" type="text" />
          </div>
          <div className="inline">
            <label htmlFor="state">State</label>
            <input name="state" type="text" />
          </div>
          <div>
            <label htmlFor="zipCode">Zip Code</label>
          </div>
          <input name="zipCode" type="number" />
        </div>
        <h2>User Name & Password</h2>
        <div>
          <label htmlFor="userName">User Name</label>
          <input name="userName" type="text" />
        </div>
        <div>
          <div className="inline">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" />
          </div>
          <div className="inline">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input name="confirmPassword" type="password" />
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
