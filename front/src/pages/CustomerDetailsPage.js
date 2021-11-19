import CustomerDetailsForm from "../components/customer/CustomerDetailsForm";

function CustomerDetailsPage(props) {
  if (props.userData !== undefined) {
    return (
      <div>
        <h1>{`${props.userData.firstName} ${props.userData.lastName}`}</h1>
        <div>
          <CustomerDetailsForm userData={props.userData}/>
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
