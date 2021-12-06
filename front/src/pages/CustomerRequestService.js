/* MICHAEL CHANG */

import PropTypes from "prop-types";
import LaundryRequestForm from "../components/customer/newLaundryRequests/LaundryRequestForm";
import GoogleMaps from "../components/api/GoogleMaps.js";
import ProviderCards from "../components/customer/newLaundryRequests/ProviderCards";
import UserLoginContext from "../store/UserLoginContext";
import { useState, useContext } from "react";

let availableProviders = [];
let servicesRequested = {};

function CustomerRequestService() {
  //intialize useContext
  const userContext = useContext(UserLoginContext);

  let providerCardRender = [];
  let providerCards = [];
  let providerCoordinates = [];

  const [gotProivders, setGotProivders] = useState();
  const [sortPriceLowHigh, setSortPriceLowHigh] = useState(false);
  const [sortPriceHighLow, setSortPriceHighLow] = useState(false);
  const [sortDistance, setSortDistance] = useState(false);

  // set booleans for which sort is selected
  function setSortPriceLowHighFunc() {
    setSortPriceLowHigh(true);
    setSortPriceHighLow(false);
    setSortDistance(false);
  }

  function setSortPriceHighLowFunc() {
    setSortPriceLowHigh(false);
    setSortPriceHighLow(true);
    setSortDistance(false);
  }

  function setSortDistanceFunc() {
    setSortPriceLowHigh(false);
    setSortPriceHighLow(false);
    setSortDistance(true);
  }

  // https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
  // arbitrary distance since addresses are from mockaroo date (not real)
  function haversine_distance(mk1, mk2) {
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = mk2.lng - mk1.lng * (Math.PI / 180); // Radian difference (longitudes)

    const d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d.toFixed(2);
  }

  // laudnry request fetch
  const laundryRequestFetch = async (data) => {
    const response = await fetch("/api/laundryRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    availableProviders = await response.json();
    servicesRequested = data;

    // const destination = provider.geoCode.results[0].geometry.location;
    const origin = userContext.userDetails.geoCode.results[0].geometry.location;

    availableProviders.sort(
      (a, b) =>
        haversine_distance(a.geoCode.results[0].geometry.location, origin) -
        haversine_distance(b.geoCode.results[0].geometry.location, origin)
    );

    //I'm just setting true false back and forth for component to re-render
    setGotProivders(!gotProivders);
  };

  // loop through the providers returned from backend
  availableProviders.forEach((provider, index) => {
    // calculate each costs
    const laundryCost = servicesRequested.wash
      ? provider.serviceObjects.wash.price * servicesRequested.wash
      : 0;
    const dryCleanCost = servicesRequested.dryClean
      ? provider.serviceObjects.dryClean.price * servicesRequested.dryClean
      : 0;
    const foldingCost = servicesRequested.fold
      ? provider.serviceObjects.fold.price
      : 0;
    const deliveryCost = servicesRequested.delivery
      ? provider.serviceObjects.delivery.price
      : 0;
    const totalCost = laundryCost + dryCleanCost + foldingCost + deliveryCost;

    // used for haversine_distance calc
    // arbitrary distance since addresses are from mockaroo date (not real)
    const destination = provider.geoCode.results[0].geometry.location;
    const origin = userContext.userDetails.geoCode.results[0].geometry.location;
    const distance = haversine_distance(destination, origin);

    providerCards.push([
      <ProviderCards
        index={index}
        provider={provider}
        servicesRequested={servicesRequested}
        laundryCost={laundryCost}
        dryCleanCost={dryCleanCost}
        foldingCost={foldingCost}
        deliveryCost={deliveryCost}
        totalCost={totalCost}
        distance={distance}
      />,
      totalCost,
      distance,
    ]);
    providerCoordinates.push(provider.geoCode.results[0].geometry.location);
  });

  // optional radio button sort
  if (sortPriceLowHigh) {
    providerCards.sort((a, b) => a[1] - b[1]);
  } else if (sortPriceHighLow) {
    providerCards.sort((a, b) => b[1] - a[1]);
  } else if (sortDistance) {
    // using haversine_distance calculation
    providerCards.sort((a, b) => a[2] - b[2]);
  }

  //providerCards - [0] is provider Object [1] is date [2] is cost [3] is zipCode
  // push cards[0] into an array to render in the react component
  providerCards.forEach((card) => {
    providerCardRender.push(card[0]);
  });

  function showCards() {
    if (providerCardRender.length > 0) {
      return providerCardRender;
    } else {
      return (
        <h2 className="d-flex h-100 align-items-center justify-content-center">
          Go have fun! Let us do the chores! Request Today!!
        </h2>
      );
    }
  }

  return (
    <div>
      <h1>Request Laundry Service</h1>
      <div className="row">
        <div className="col-3">
          <LaundryRequestForm
            laundryRequestFetch={laundryRequestFetch}
            providerCards={providerCards}
            setSortPriceLowHighFunc={setSortPriceLowHighFunc}
            setSortPriceHighLowFunc={setSortPriceHighLowFunc}
            setSortDistanceFunc={setSortDistanceFunc}
          />
        </div>
        <div className="col-5">{showCards()}</div>
        <div className="col-4">
          <GoogleMaps providerCoordinates={providerCoordinates} />
        </div>
      </div>
    </div>
  );
}

CustomerRequestService.propTypes = {
  laundryRequestFetch: PropTypes.func,
  setSortPriceLowHighFunc: PropTypes.func,
  setSortPriceHighLowFunc: PropTypes.func,
  setSortDistanceFunc: PropTypes.func,
  providerCards: PropTypes.array,
  provider: PropTypes.object,
  customer: PropTypes.object,
  servicesRequested: PropTypes.object,
  index: PropTypes.number,
  laundryCost: PropTypes.number,
  dryCleanCost: PropTypes.number,
  foldingCost: PropTypes.number,
  deliveryCost: PropTypes.number,
  totalCost: PropTypes.number,
  distance: PropTypes.number,
  providerCoordinates: PropTypes.array,
};

export default CustomerRequestService;
