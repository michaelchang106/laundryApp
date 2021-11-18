import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./LaundryRequestForm.module.css";

function LaundryRequestForm(props) {
  // initailize react hooks

  const poundsOfLaundryRef = useRef();
  const service1Ref = useRef();
  const service2Ref = useRef();
  const service3Ref = useRef();
  const service4Ref = useRef();
  const service5Ref = useRef();

  // onSubmit customer form handler
  async function laundryRequestHandler(event) {
    event.preventDefault();

    const poundsOfLaundry = poundsOfLaundryRef.current.value;
    const service1 = service1Ref.current.checked;
    const service2 = service2Ref.current.checked;
    const service3 = service3Ref.current.checked;
    const service4 = service4Ref.current.checked;
    const service5 = service5Ref.current.checked;

    const laundryRequestData = {
      poundsOfLaundry: poundsOfLaundry,
      service1: service1,
      service2: service2,
      service3: service3,
      service4: service4,
      service5: service5,
    };

    props.laundryRequestFetch(laundryRequestData);
  }

  // form component
  return (
    <Card>
      <form className={classes.form} onSubmit={laundryRequestHandler}>
        <div className={classes.control}>
          <label htmlFor="poundsOfLaundry">Pounds of Laundry</label>
          <input
            type="number"
            placeholder="Estimated Laundry in pounds (whole numbers only)"
            required
            name="poundsOfLaundry"
            ref={poundsOfLaundryRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="service1">Service 1</label>
          <input type="checkbox" name="service1" ref={service1Ref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="service2">Service 2</label>
          <input type="checkbox" name="service2" ref={service2Ref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="service3">Service 3</label>
          <input type="checkbox" name="service3" ref={service3Ref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="service4">Service 4</label>
          <input type="checkbox" name="service4" ref={service4Ref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="service5">Service 5</label>
          <input type="checkbox" name="service5" ref={service5Ref} />
        </div>

        <div className={classes.actions}>
          <button>Request!</button>
        </div>
      </form>
    </Card>
  );
}

export default LaundryRequestForm;
