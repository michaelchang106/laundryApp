// MICHAEL CHANG

import { useRef, useState } from "react";

import Card from "../../ui/Card";
import classes from "./LaundryRequestForm.module.css";

function LaundryRequestForm(props) {
  // initailize react hooks
  const poundsOfLaundryRef = useRef();
  const foldRef = useRef();
  const poundsOfDryCleanRef = useRef();
  const deliveryRef = useRef();
  const dateRef = useRef();

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
    // Xuejia Yang: I found that if I enter the date in a wrong format, i.e., 01212021, nothing would happen but the text tells me "Loading". It may
    //              let users wait for a long time but no further changes, which will lead to bad user experience. Could you please add a format
    //              checker like the one you used in sign up form?
    const date = dateRef.current.value;

    const today = new Date();
    if (date < today.toLocaleDateString()) {
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
    };

    await props.laundryRequestFetch(laundryRequestData);
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
          <label htmlFor="poundsOfLaundry">
            Estimated Pounds of Laundry for Wash
          </label>
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
          <label htmlFor="poundsOfDryClean">
            Estimated Pounds of Laundry for Dry Clean
          </label>
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
          <input
            type="radio"
            id="priceLowHigh"
            name="sort"
            onChange={props.setSortPriceLowHighFunc}
          />
          <label htmlFor="priceAsc">Price Low-High</label>
          <input
            type="radio"
            id="priceHighLow"
            name="sort"
            onChange={props.setSortPriceHighLowFunc}
          />
          <label htmlFor="priceDesc">Price High-Low</label>
          <input
            type="radio"
            id="distance"
            name="sort"
            onChange={props.setSortDistanceFunc}
          />
          <label htmlFor="distance">Distance</label>
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
          <label htmlFor="wash">Need Laundry Wash (per lbs.)?</label>
          <input type="checkbox" name="wash" onChange={setWashFormFunc} />
        </div>
        {showWashForm()}
        <div className={classes.checkBoxControl}>
          <label htmlFor="dryClean">Need Dry Clean? (per lbs.)</label>
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
          <button>Ready to Wash!</button>
        </div>
        {showSortOptions()}
      </form>
    </Card>
  );
}

export default LaundryRequestForm;
