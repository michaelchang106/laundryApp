// MICHAEL CHANG

import { useRef, useState, useContext } from "react";

import Card from "../../ui/Card";
import classes from "./LaundryRequestForm.module.css";
import UserLoginContext from "../../../store/UserLoginContext";

function LaundryRequestForm(props) {
  // initailize react hooks
  const poundsOfLaundryRef = useRef();
  const foldRef = useRef();
  const poundsOfDryCleanRef = useRef();
  const deliveryRef = useRef();
  const dateRef = useRef();
  const userContext = useContext(UserLoginContext);

  const [readyToWashButton, setReadyToWashButton] = useState("Ready to Wash!");
  const [dateErrorMessage, setDateErrorMesssage] = useState();
  const [dryCleanForm, setDryCleanForm] = useState(false);
  const [washForm, setWashForm] = useState(false);

  // onSubmit customer form handler
  async function laundryRequestHandler(event) {
    event.preventDefault();

    const poundsOfLaundry = poundsOfLaundryRef.current.value;
    const fold = foldRef.current.checked;
    const poundsOfDryClean = poundsOfDryCleanRef.current.value;
    const delivery = deliveryRef.current.checked;
    const date = dateRef.current.value;

    const today = new Date();
    if (Date.parse(date) < Date.parse(today)) {
      setDateErrorMesssage("Date can not be in the past");
      return;
    } else {
      setDateErrorMesssage();
    }

    const laundryRequestData = {
      wash: poundsOfLaundry,
      dryClean: poundsOfDryClean,
      fold: fold,
      delivery: delivery,
      date: date,
      state: userContext.userDetails.state,
    };

    setReadyToWashButton("Loading...");
    await props.laundryRequestFetch(laundryRequestData);
    setReadyToWashButton("Ready to Wash!");
  }

  // define functions to pass down as props
  function setDryCleanFormFunc() {
    setDryCleanForm(!dryCleanForm);
  }

  function setWashFormFunc() {
    setWashForm(!washForm);
  }

  function showWashForm() {
    if (washForm) {
      return (
        <div className={classes.textControl}>
          <label htmlFor="poundsOfLaundry">Estimated lbs. of laundry</label>
          <input
            type="number"
            placeholder="Estimated pounds"
            required
            name="poundsOfLaundry"
            ref={poundsOfLaundryRef}
          />
        </div>
      );
    } else {
      return (
        <input
          type="hidden"
          value=""
          name="poundsOfLaundry"
          ref={poundsOfLaundryRef}
        />
      );
    }
  }

  function showDryCleanForm() {
    if (dryCleanForm) {
      return (
        <div className={classes.textControl}>
          <label htmlFor="poundsOfDryClean">Estimated lbs. of Dry Clean</label>
          <input
            type="number"
            placeholder="Estimated pounds"
            required
            name="poundsOfDryClean"
            ref={poundsOfDryCleanRef}
          />
        </div>
      );
    } else {
      return (
        <input
          type="hidden"
          value=""
          name="poundsOfDryClean"
          ref={poundsOfDryCleanRef}
        />
      );
    }
  }

  function showSortOptions() {
    if (props.providerCards.length > 0) {
      return (
        <div className={classes.checkBoxControl}>
          <div>Sort By:</div>
          <div>
            <input
              type="radio"
              id="priceLowHigh"
              name="sort"
              onChange={props.setSortPriceLowHighFunc}
            />
            <label htmlFor="priceAsc">Price Low-High</label>
          </div>
          <div>
            <input
              type="radio"
              id="priceHighLow"
              name="sort"
              onChange={props.setSortPriceHighLowFunc}
            />
            <label htmlFor="priceDesc">Price High-Low</label>
          </div>

          <div>
            <input
              type="radio"
              id="distance"
              name="sort"
              onChange={props.setSortDistanceFunc}
            />
            <label htmlFor="distance">Distance</label>
          </div>
        </div>
      );
    } else {
      return;
    }
  }

  // form component
  return (
    <Card>
      <form className={classes.form} onSubmit={laundryRequestHandler}>
        <div className={classes.checkBoxControl}>
          <label htmlFor="wash">Laundry (per lbs.)</label>
          <input type="checkbox" name="wash" onChange={setWashFormFunc} />
        </div>
        {showWashForm()}
        <div className={classes.checkBoxControl}>
          <label htmlFor="dryClean">Dry Clean? (per lbs.)</label>
          <input
            type="checkbox"
            name="dryClean"
            onChange={setDryCleanFormFunc}
          />
        </div>
        {showDryCleanForm()}
        <span className={classes.checkBoxControl}>
          <label htmlFor="fold">Folded</label>
          <input type="checkbox" name="fold" ref={foldRef} />
        </span>

        <span className={classes.checkBoxControl}>
          <label htmlFor="delivery">Delivered</label>
          <input type="checkbox" name="delivery" ref={deliveryRef} />
        </span>
        <div className={classes.textControl}>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            required
            placeholder="eg. 01/31/2021"
            name="date"
            ref={dateRef}
          />
        </div>
        <div className={classes.error}>
          <p>{dateErrorMessage}</p>
        </div>
        <div className={classes.actions}>
          <button>{readyToWashButton}</button>
        </div>
        {showSortOptions()}
      </form>
    </Card>
  );
}

export default LaundryRequestForm;
