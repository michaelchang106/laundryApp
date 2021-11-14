import Card from "../ui/Card";
import classes from "./signupStyle/SignUpCustomerForm.module.css";

function SignUpCustomerForm() {
  function submitHandler(event) {
    event.preventDefault();
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="firstname">First Name</label>
          <input type="text" placeholder="First Name" required id="firstname" />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" placeholder="Last Name" required id="lastname" />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="email@email.com"
            required
            id="email"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            id="password"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input type="text" placeholder="City Name" required id="city" />
        </div>
        <div className={classes.control}>
          <label htmlFor="state">State</label>
          <input type="text" placeholder="State Name" required id="state" />
        </div>
        <div className={classes.control}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            required
            id="phone"
          />
        </div>
        <div className={classes.actions}>
          <button>Create Account</button>
        </div>
      </form>
    </Card>
  );
}

export default SignUpCustomerForm;
