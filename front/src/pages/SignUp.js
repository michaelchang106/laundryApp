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
              <h3>I am a laundry provider! I can wash!</h3>
            </div>
            <div className="d-flex justify-content-center">
              <Link to="/signUpProviders">Providers Sign Up</Link>
            </div>
          </Card>
        </div>
        <div className="col-6 ">
          <Card>
            <div className="d-flex justify-content-center">
              <h3>I like my laundry clean and spotless!</h3>
            </div>
            <div className="d-flex justify-content-center">
              <Link to="/signUpCustomers">Customers Sign Up</Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
