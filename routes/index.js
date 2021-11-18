const express = require("express");
const router = express.Router();
const dbManager = require("../database/dbManager.js");
const bcrypt = require("bcrypt");

/* POST createCustomer. */
router.post("/createCustomer", async function (req, res) {
  console.log("Got /createCustomer POST request");

  try {
    const rawData = req.body;
    let loginCred = {};
    let userData = {};

    //Checks seperates login credentials and user info
    for (const [key, value] of Object.entries(rawData)) {
      if (key === "password") {
        loginCred[key] = value;
      } else if (key === "email") {
        loginCred[key] = value;
        userData[key] = value;
      } else {
        userData[key] = value;
      }
    }

    // const customerData = {
    //   firstName: rawData.firstName,
    //   lastName: rawData.lastName,
    //   email: rawData.email,
    //   city: rawData.city,
    //   zipCode: rawData.zipCode,
    //   state: rawData.state,
    //   phoneNumber: rawData.phoneNumber,
    //   userType: rawData.userType,
    // };

    await bcrypt.hash(loginCred.password, 10, async (error, hash) => {
      if (error) {
        throw new Error(error);
      }
      loginCred.password = hash; //Change the password to the hash form.
      // const loginData = {
      //   email: rawData.email,
      //   password: hash,
      //   userType: rawData.userType,
      // };
      // const response = await dbManager.addUser("loginCreds", loginData);
      const response = await dbManager.addUser("loginCreds", loginCred);

      if (response) {
        if (loginCred.userType === "customer") {
          await dbManager.addUser("customers", userData);
        } else if (loginCred.userType === "provider") {
          await dbManager.addUser("providers", userData);
        } else {
          console.log("Error adding user to database");
        }
      }

      res.json(response);
    });
  } catch (error) {
    res.send(error);
  }
});

/* POST findEmail. */
router.post("/findEmail", async function (req, res) {
  console.log("Got /findEmail POST request");
  try {
    const rawData = req.body;

    const response = await dbManager.findUser("loginCreds", rawData);

    res.json(response);
  } catch (error) {
    res.send(error);
  }
});

/* POST login. */
router.post("/login", async function (req, res) {
  console.log("Got /login POST request");
  try {
    const rawData = req.body;

    const response = await dbManager.findUser("loginCreds", rawData.email);

    bcrypt.compare(rawData.password, response.password, async (err, result) => {
      // if bcrypt compare password is good
      if (result) {
        // return the customer record
        if (response.userType === "customer") {
          const customerRecord = await dbManager.findUser(
            "customers",
            rawData.email
          );
          res.json(customerRecord);
          // return the provider record
        } else if (response.userType === "provider") {
          const providerRecord = await dbManager.findUser(
            "providers",
            rawData.email
          );
          res.json(providerRecord);
        }
        // if bcrypt compare password is NOT good return the error
      } else {
        res.json({ error: "Password does not match our records" });
      }
    });
  } catch (error) {
    res.send({ error: "Email not found, please sign up!" });
  }
});

module.exports = router;
