const collectionName = "contacts";

let currentMongodbClient;

let setMongodbClient = (mongodbClientInstace) => {
  currentMongodbClient = mongodbClientInstace;
};

let create = (newObj) => {
  const contactsCollection = currentMongodbClient
    .db()
    .collection(collectionName);
  return contactsCollection.insertOne(newObj);
};

let findOne = (queryObj) => {
  const contactsCollection = currentMongodbClient
    .db()
    .collection(collectionName);

  return contactsCollection.findOne(queryObj);
};

let find = (queryObj) => {
  const contactsCollection = currentMongodbClient
    .db()
    .collection(collectionName);

  return contactsCollection.find(queryObj).toArray();
};

let update = (queryObj, setObj) => {
  const contactsCollection = currentMongodbClient
    .db()
    .collection(collectionName);
  return contactsCollection.updateMany(queryObj, setObj, {
    multi: true,
  });
};

let findAllSecondary = (queryObj) => {
  const contactsCollection = currentMongodbClient
    .db()
    .collection(collectionName);

  return contactsCollection
    .find(queryObj)
    .sort({ createdAt: 1 })
    .skip(1)
    .toArray();
};

module.exports = {
  setMongodbClient: setMongodbClient,
  create: create,
  findOne: findOne,
  find,
  findAllSecondary,
  update: update,
};
