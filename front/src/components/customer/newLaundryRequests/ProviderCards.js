import LaundryCustomerConfirm from "./LaundryCustomerConfirm";
import { useContext } from "react";
import UserLoginContext from "../../../store/UserLoginContext";
import Card from "../../ui/Card";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ProviderCards({
  provider,
  servicesRequested,
  index,
  laundryCost,
  foldingCost,
  dryCleanCost,
  deliveryCost,
  totalCost,
  distance,
}) {
  const userContext = useContext(UserLoginContext);

  return (
    <div className="mt-2">
      <Card>
        <div className="row pt-4 ps-4">
          <h3 className="d-flex justify-content-center">
            {index + 1}) {provider.companyName}
          </h3>
          <div className="row">
            <span className="col-12">
              <strong>Date: </strong> {servicesRequested.date}
            </span>
          </div>
          <div className="row">
            <span className="col-12 mt-2">
              <strong>Email: </strong> {provider.email}
            </span>
            <span className="col-12">
              <strong>Phone Number: </strong> {provider.phoneNumber}
            </span>
            <span className="col-12 mt-2">
              <strong>Address: </strong> {provider.address}
            </span>
            <span className="col-6">
              <strong>City: </strong> {provider.city}
            </span>
            <span className="col-6">
              <strong>State: </strong> {provider.state}
            </span>
            <span className="col-6">
              <strong>Zip Code: </strong> {provider.zipCode}
            </span>
            <span className="col-6">
              <strong>Distance: </strong> {distance}
            </span>
          </div>
          <div className="row">
            <span className="col-6 mt-2">
              <strong>Laundry Cost: </strong>
              {currencyFormatter.format(laundryCost)}
            </span>
            <span className="col-6 mt-2">
              <strong>Dry Cleaning Cost: </strong>
              {currencyFormatter.format(dryCleanCost)}
            </span>
            <span className="col-6">
              <strong>Cost for Folding: </strong>
              {currencyFormatter.format(foldingCost)}
            </span>
            <span className="col-6">
              <strong>Cost for Delivery: </strong>
              {currencyFormatter.format(deliveryCost)}
            </span>
          </div>
          <div className="row">
            <span className="d-flex justify-content-end mt-2">
              <strong>
                Total Costs:
                {currencyFormatter.format(totalCost)}
              </strong>
            </span>
          </div>
        </div>
        <LaundryCustomerConfirm
          provider={provider}
          customer={userContext.userDetails}
          servicesRequested={servicesRequested}
          totalCost={totalCost}
        />
      </Card>
    </div>
  );
}

export default ProviderCards;
