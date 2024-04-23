const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const ContactsModel = require("./app/models/contacts");
const contactsRouter = require("./app/routes/contacts")

const app = express();

app.use(express.json());

const connectMongoDB = async () => {
  const client = new MongoClient(process.env.MONGO_URL);

  await client.connect();

  ContactsModel.setMongodbClient(client);

  console.log("Connected successfully to server");
};

connectMongoDB().then().catch();

contactsRouter(app)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
