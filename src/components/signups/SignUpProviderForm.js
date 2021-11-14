import Card from "../ui/Card";
import "./signupStyle/SignUpProvide.css";

const SignUpProviderForm = () => {
  return (
    <Card>
      <form action="">
        <h2>Contact Info</h2>
        <div class="fullLengthIn">
          <label htmlFor="">Company Name</label>
          <input type="text" placeholder="Enter Company Name" />
        </div>
        <div>
          <div className="inline">
            <label htmlFor="">First Name</label>
            <input type="text" placeholder="Enter First Name" />
          </div>
          <div className="inline">
            <label htmlFor="">Last Name</label>
            <input type="text" placeholder="Enter Last Name" />
          </div>
        </div>
        <div>
          <div className="inline">
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Enter Email" />
          </div>
          <div className="inline">
            <label htmlFor="">Phone</label>
            <input type="tel" placeholder="XXX-XXX-XXXX" />
          </div>
        </div>
        <h2>Address</h2>
        <div>
          <div class="fullLengthIn">
            <label htmlFor="">Address Line 1</label>
            <input type="text" />
            <label htmlFor="">Address Line 2</label>
            <input type="text" />
          </div>

          <div className="inline">
            <label htmlFor="">City</label>
            <input type="text" />
          </div>
          <div className="inline">
            <label htmlFor="">State</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Zip Code</label>
          </div>
          <input type="number" />
        </div>
        <h2>User Name & Password</h2>
        <div>
          <label htmlFor="">User Name</label>
          <input type="text" />
        </div>
        <div>
          <div className="inline">
            <label htmlFor="">Password</label>
            <input type="password" />
          </div>
          <div className="inline">
            <label htmlFor="">Confirm Password</label>
            <input type="password" />
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
