/* MICHAEL CHANG & DANIEL LISKO*/

import laundryUser from "../images/laundryUser.jpg";
import laundryProvider from "../images/laundryProvider.jpg";

import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

function SignUp() {
  // Xuejia Yang: The two sign up types' pictures are in different size. It may be better
  //              if you could crop the images so as to obey the alignment design rule.
  //              It is also a little bit annoying because I need to read so many words
  //              just to sign up for an account. Maybe use more intuitive description?
  return (
    <div>
      <h1>Sign Up Page</h1>
      <div className="row">
        <div className="col-6 d-flex justify-content-center">
          <Link to="/signUpProviders">
            <Card>
              <div className="d-flex justify-content-center">
                <h2>I am a laundry provider! I can wash!</h2>
              </div>
              <div className="d-flex justify-content-center">
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={laundryProvider}
                  alt="Worker holding freshly cleaned towels at a laundry provider business"
                />
              </div>
              <div>
                Picture from{" "}
                <a href="https://boltlaundry.com/wp-content/uploads/2021/01/Commercial-Laundry-Service-In-Knoxville-TN.jpg">
                  boltlaundry.com
                </a>
              </div>
            </Card>
          </Link>
        </div>
        <div className="col-6 ">
          <Link to="/signUpCustomers">
            <Card>
              <div className="d-flex justify-content-center">
                <h2>I like my laundry clean and spotless!</h2>
              </div>
              <div className="d-flex justify-content-center">
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
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
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
