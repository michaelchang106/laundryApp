const express = require("express");
const router = express.Router();
const dbManager = require("../database/dbManager.js");

/* POST createLogin. */
router.post("/createLogin", function (req, res, next) {
  console.log("Got /createLogin POST request");
  const data = req.body;
  dbManager.addUser("logins", data);
  console.log(data, typeof data);
  res.status(200).send();
});

/* POST createCustomer. */
router.post("/createCustomer", function (req, res, next) {
  console.log("Got /createCustomer POST request");
  const data = req.body;
  dbManager.addCustomer("customers", data);
  console.log(data, typeof data);
  res.status(200).send();
});

module.exports = router;
