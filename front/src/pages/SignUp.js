/* MICHAEL CHANG & DANIEL LISKO*/

import laundryUser from "../images/laundryUser.jpg";
import laundryProvider from "../images/laundryProvider.jpg";

import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

function SignUp() {
  return (
    <div>
      <h1>Sign Up Page</h1>
      <div className="row">
        <div className="col-6 d-flex justify-content-center">
          <Card>
            <div className="d-flex justify-content-center">
              <h4>I am a laundry provider! I can wash!</h4>
            </div>
            <div className="d-flex justify-content-center">
              <Link to="/signUpProviders">
                <strong>Providers Sign Up</strong>
              </Link>
            </div>
            <div>
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  "object-fit": "contain",
                }}
                src={laundryProvider}
                alt="Worker holding freshly cleaned towels at a laundry provider business"
              />
              Picture from{" "}
              <a href="https://boltlaundry.com/wp-content/uploads/2021/01/Commercial-Laundry-Service-In-Knoxville-TN.jpg">
                boltlaundry.com
              </a>
            </div>
          </Card>
        </div>
        <div className="col-6 ">
          <Card>
            <div className="d-flex justify-content-center">
              <h4>I like my laundry clean and spotless!</h4>
            </div>
            <div className="d-flex justify-content-center">
              <Link to="/signUpCustomers">
                <strong>Customers Sign Up</strong>
              </Link>
            </div>
            <div className="d-flex justify-content-center">
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  "object-fit": "contain",
                }}
                src={laundryUser}
                alt="Woman doing laundry with a smile"
              />
            </div>
            <div>
              Picture from{" "}
              <a href="https://www.wash.com/wp-content/uploads/2019/04/woman-doing-laundry.jpg">
                wash.com
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
