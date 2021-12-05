/* MICHAEL CHANG */
// helper code used to add geocode for the 500 customers and 500 providers
const axios = require("axios");
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

const geoCodeFetch = async (data) => {
  const googleAPI = [
    "https://maps.googleapis.com/maps/api/geocode/json?address=",
    data.address.replace(" ", "+"),
    `+${data.city.replace(" ", "+")}+${data.state}&key=`,
    process.env.GOOGLE_API_KEY,
  ].join("");

  const response = await axios.get(googleAPI);
  return response;
};

const getGeoCodes = async () => {
  let connectedCollection;

  try {
    connectedCollection = await collectionConnect("customers");
    const collection = connectedCollection.collection;
    const res = await collection.find();
    const results = await res.toArray();

    await results.forEach(async (result) => {
      const customerData = {
        address: result.address,
        city: result.city,
        state: result.state,
        email: result.email,
      };

      const googleGeoCode = await geoCodeFetch(customerData);

      let connectedCollectionInternal;
      try {
        connectedCollectionInternal = await collectionConnect("customers");
        const collectionInternal = connectedCollectionInternal.collection;
        const filter = { email: result.email };
        const update = { $set: { geoCode: googleGeoCode.data } };
        const options = { upsert: true };

        await collectionInternal.findOneAndUpdate(filter, update, options);
      } catch (error) {
        console.log("ERROR--", error);
      } finally {
        await connectedCollectionInternal.client.close();
      }
    });
  } catch (error) {
    console.log("ERROR--", error);
  } finally {
    await connectedCollection.client.close();
  }
};

getGeoCodes();
