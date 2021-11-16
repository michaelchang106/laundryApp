const express = require("express");
const router = express.Router();
const dbManager = require("../database/dbManager.js");

// /* POST createLogin. */
// router.post("/createLogin", function (req, res, next) {
//   console.log("Got /createLogin POST request");
//   const data = req.body;
//   dbManager.addUser("logins", data);
//   console.log(data, typeof data);
//   res.status(200).send();
// });

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
