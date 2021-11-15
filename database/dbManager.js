const { MongoClient } = require("mongodb");

//This connects to the collections
const collectionConnect = async (documents) => {
  //Database Name
  const dbName = "laundryApp";

  //Connect to url
  const url = "mongodb://localhost:27017";
  const client = await new MongoClient(
    url,
    { useUnifiedTopology: true },
    { useNewUrlParser: true }
  );

  //Connect to db
  await client.connect();
  console.log("Connected to server");

  //Connect to collection
  const db = await client.db(dbName);
  collection = await db.collection(documents);
  console.log("collection => ", documents);

  return { collection, client };
};

//-----------------Customer/Provider Shared Features-------//

//Sign Up

const addUser = async (collectionName, data) => {
  let connectedCollection;

  try {
    //Check if user Exist: If it does than return false
    const res = await findUser(collectionName, testData.userName);
    connectedCollection = await collectionConnect(collectionName);
    const collection = connectedCollection.collection;

    if (res) {
      console.log("User Exist");
      return false;
    }

    await collection.insertOne(data);
    console.log("User Added!");
  } finally {
    await connectedCollection.client.close();
  }
};

const findUser = async (collectionName, userName) => {
  try {
    connectedCollection = await collectionConnect(collectionName);
    const collection = connectedCollection.collection;
    const res = await collection.findOne({ userName: userName });
    return res;
  } finally {
    await connectedCollection.client.close();
  }
};

//-----------------Provider DB Manager--------------------//

//----------------------Test------------------------------//

const testData = {
  firstName: "Daniel",
  lastName: "Lisko",
  userName: "djlisko01",
  userType: "provider",
  password: 123,
};

main = async () => {
  // const res = await findUser("loginCredentials", testData.userName);
  // console.log("---->", res);
  await addUser("loginCredentials", testData);
};

main();
