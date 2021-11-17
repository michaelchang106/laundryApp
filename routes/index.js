const express = require("express");
const router = express.Router();
const dbManager = require("../database/dbManager.js");

/* POST createCustomer. */
router.post("/createCustomer", async function (req, res, next) {
  console.log("Got /createCustomer POST request");
  const rawData = req.body;

  const customerData = {
    firstName: rawData.firstName,
    lastName: rawData.lastName,
    email: rawData.email,
    city: rawData.city,
    state: rawData.state,
    phoneNumber: rawData.phoneNumber,
    userType: rawData.userType,
  };

  const loginData = {
    email: rawData.email,
    password: rawData.password,
    userType: rawData.userType,
  };

  await dbManager.addUser("loginCreds", loginData);

  if (loginData.userType === "customer") {
    await dbManager.addUser("customers", customerData);
  }

  res.status(200).send();
});

module.exports = router;
