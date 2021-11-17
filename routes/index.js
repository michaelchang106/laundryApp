const express = require("express");
const router = express.Router();
const dbManager = require("../database/dbManager.js");
const bcrypt = require("bcrypt");

/* POST createCustomer. */
router.post("/createCustomer", async function (req, res) {
  console.log("Got /createCustomer POST request");

  try {
    const rawData = req.body;

    const customerData = {
      firstName: rawData.firstName,
      lastName: rawData.lastName,
      email: rawData.email,
      city: rawData.city,
      zipCode: rawData.zipCode,
      state: rawData.state,
      phoneNumber: rawData.phoneNumber,
      userType: rawData.userType,
    };

    await bcrypt.hash(rawData.password, 10, async (error, hash) => {
      if (error) {
        throw new Error(error);
      }
      const loginData = {
        email: rawData.email,
        password: hash,
        userType: rawData.userType,
      };
      const response = await dbManager.addUser("loginCreds", loginData);

      if (response) {
        if (loginData.userType === "customer") {
          await dbManager.addUser("customers", customerData);
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
