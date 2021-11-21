const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@laundryappcluster0.7qka0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//This connects to the collections
const collectionConnect = async (documents) => {
  //Database Name
  const dbName = "laundryApp";

  //Connect to url

  const url = uri || "mongodb://localhost:27017";
  const client = await new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  //Connect to db
  await client.connect();
  console.log("Connected to server");

  //Connect to collection
  const db = await client.db(dbName);
  const collection = await db.collection(documents);
  console.log("collection => ", documents);

  return { collection, client };
};

//-----------------Customer/Provider Shared Features-------//
const findUser = async (collectionName, email) => {
  let connectedCollection;

  console.log("finding");

  try {
    connectedCollection = await collectionConnect(collectionName);
    const collection = connectedCollection.collection;
    const res = await collection.findOne({ email: email });
    return res;
  } catch (error) {
    console.log("ERROR--", error);
  } finally {
    await connectedCollection.client.close();
  }
};

//wash  dryclean(perPound) delivery fold (flat)

const addUser = async (collectionName, data) => {
  let connectedCollection;

  try {
    //Check if user Exist: If it does than return false
    connectedCollection = await collectionConnect(collectionName);
    const collection = connectedCollection.collection;
    const res = await findUser(collectionName, data.email);

    if (res) {
      console.log("User Exist");
      return false;
    }

    await collection.insertOne(data);
    console.log(`User Added to ${collectionName} collection!`);
    return true;
  } catch (error) {
    console.log("ERROR--", error);
  } finally {
    await connectedCollection.client.close();
  }
};

const updateUserDetails = async (collectionName, data) => {
  let connectedCollection;

  try {
    connectedCollection = await collectionConnect(collectionName);
    const collection = connectedCollection.collection;
    const filter = { email: data.email };

    for (const [key, value] of Object.entries(data)) {
      const update = { $set: { [key]: value } };
      if (key !== "email" && key !== "userType") {
        await collection.updateOne(filter, update);
      }
    }
  } catch (error) {
    console.log("ERROR--", error);
  } finally {
    await connectedCollection.client.close();
  }
};

const laundryRequest = async (collectionName, data) => {
  let connectedCollection;

  try {
    connectedCollection = await collectionConnect(collectionName);
    const collection = connectedCollection.collection;

    // construct filter
    let filter = {};
    for (const [key, value] of Object.entries(data)) {
      if (key !== "poundsOfLaundry") {
        filter[`serviceObjects.${key}`] = { $exists: value };
      }
    }

    const res = await collection.find(filter);
    const allProviders = await res.toArray();
    return allProviders;
  } catch (error) {
    console.log("ERROR--", error);
  } finally {
    await connectedCollection.client.close();
  }
};

//-----------------Provider DB Manager--------------------//
//Helper to convert array to a
const makeServiceObj = (serviceData) => {
  let tmp = {};

  serviceData.forEach((item) => {
    let service = item.service;

    service = service.split(" ").join("");
    service = service[0].toLowerCase() + service.slice(1);

    tmp[`${service}`] = {
      price: item.price,
      perPound: item.perPound,
      serviceID: item.serviceID,
    };
  });

  return tmp;
};

const updateService = async (serviceData, email) => {
  let connectedCollection;

  let serviceDataObj = makeServiceObj(serviceData);

  console.log("RAW DATE", serviceData);
  try {
    connectedCollection = await collectionConnect("providers");
    const collection = connectedCollection.collection;
    await collection.updateOne(
      { email: email },
      { $set: { serviceObjects: serviceDataObj } }
    );
  } catch (error) {
    console.log("ERROR--", error);
  } finally {
    await connectedCollection.client.close();
  }
};

//-----------------Customer DB Manager--------------------//

module.exports = {
  addUser,
  findUser,
  updateUserDetails,
  laundryRequest,
  updateService,
};
