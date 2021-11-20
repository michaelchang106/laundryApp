import CustomerDetailsForm from "../components/customer/CustomerDetailsForm";
import { useContext } from "react";
import UserLoginContext from "../store/UserLoginContext";

function CustomerDetailsPage() {
  //intialize useContext
  const userContext = useContext(UserLoginContext);

  if (userContext.userDetails !== undefined) {
    return (
      <div>
        <h1>{`${userContext.userDetails.firstName} ${userContext.userDetails.lastName}`}</h1>
        <div>
          <CustomerDetailsForm />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Customer Details Page</h1>
    </div>
  );
}

export default CustomerDetailsPage;
