const express = require("express");
const router = express.Router();
const dbManager = require("../database/dbManager.js");
const bcrypt = require("bcrypt");

/* ------------- SHARED ROUTES (CUSTOMER AND PROIVDER) --------- */
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
      } else if (key === "email" || key === "userType") {
        loginCred[key] = value;
        userData[key] = value;
      } else {
        userData[key] = value;
      }
    }

    await bcrypt.hash(loginCred.password, 10, async (error, hash) => {
      if (error) {
        throw new Error(error);
      }
      loginCred.password = hash; //Change the password to the hash form.

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

/* POST findEmailExists. */
router.post("/findEmailExists", async function (req, res) {
  console.log("Got /findEmailExists POST request");
  try {
    const rawData = req.body;

    const response = await dbManager.findUser("loginCreds", rawData);

    res.json(response);
  } catch (error) {
    res.send(error);
  }
});

/* POST findUserDetails. */
router.post("/findUserDetails", async function (req, res) {
  console.log("Got /findUserDetails POST request");
  try {
    const rawData = req.body;
    let response;

    if (rawData.userType === "customer") {
      response = await dbManager.findUser("customers", rawData.email);
    } else if (rawData.userType === "provider") {
      response = await dbManager.findUser("providers", rawData.email);
    }

    res.json(response);
  } catch (error) {
    res.send(error);
  }
});

/* POST updateUserDetails. */
router.post("/updateUserDetails", async function (req, res) {
  console.log("Got /updateUserDetails POST request");

  try {
    const rawData = req.body;
    const collection = rawData.userType + "s";

    await dbManager.updateUserDetails(collection, rawData);
  } catch (error) {
    res.send(error);
  }
});

/* ----------------CUSTOMER ROUTES------------------------- */
/* POST laundryRequest. */
router.post("/laundryRequest", async function (req, res) {
  console.log("Got /laundryRequest POST request");
  const rawData = req.body;

  // construct query
  let servicesRequested = {};
  for (const [key, value] of Object.entries(rawData)) {
    if (key !== "date" && value) {
      servicesRequested[key] = value;
    }
  }

  try {
    const response = await dbManager.laundryRequest(
      "providers",
      servicesRequested
    );
    res.json(response);
  } catch (error) {
    res.send(error);
  }
});

/*----------------Provider Routes ----------------------------*/

/*----------------Provider Routes ----------------------------*/

//Helper to conver service object to an array of objects

const convertToServiceArr = (serviceObj) => {
  let serviceArr = [];

  for (let [key, value] of Object.entries(serviceObj)) {
    if (key === "dryClean") {
      key = "Dry Clean";
    }

    key = key[0].toUpperCase() + key.slice(1);

    const tmp = {
      service: key,
      price: value.price,
      perPound: value.perPound,
      serviceID: value.serviceID,
      showDetails: false,
      showEdit: false,
    };
    serviceArr.push(tmp);
  }
  return serviceArr;
};

router.post("/getServices", async (req, res) => {
  console.log("Getting services");
  const rawData = req.body;

  try {
    const response = await dbManager.findUser("providers", rawData.email);
    let serviceArr = convertToServiceArr(response.serviceObjects);

    console.log("arr", serviceArr);
    res.json(serviceArr);
  } catch (error) {
    res.send(error);
  }
});

router.post("/updateServices", async (req, res) => {
  const rawData = req.body;
  try {
    await dbManager.updateService(rawData.services, rawData.email);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
