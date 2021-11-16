var express = require("express");
var router = express.Router();

/* POST createCustomer. */
router.post("/createCustomer", function (req, res, next) {
  console.log("Got /createCustomer POST request");
  res.status(200).send();
});

/* POST createLogin. */
router.post("/createLogin", function (req, res, next) {
  console.log("Got /createLogin POST request");
  res.status(200).send();
});

module.exports = router;
