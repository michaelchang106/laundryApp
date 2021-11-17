const express = require("express");
const router = express.Router();
const dbManager = require("../database/dbManager.js");

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

    const loginData = {
      email: rawData.email,
      password: rawData.password,
      userType: rawData.userType,
    };

    const response = await dbManager.addUser("loginCreds", loginData);

    if (response) {
      if (loginData.userType === "customer") {
        await dbManager.addUser("customers", customerData);
      }
    }

    res.json(response);
  } catch (error) {
    res.send(error);
  }
});

/* POST createCustomer. */
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

module.exports = router;
