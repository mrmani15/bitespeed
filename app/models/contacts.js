const collectionName = 'contacts';

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
	// selectedFields._id = 0;
	return contactsCollection.findOne(queryObj);
};
let update = (queryObj, setObj) => {
	const contactsCollection = currentMongodbClient
		.db()
		.collection(collectionName);
	return contactsCollection.update(queryObj, setObj, {
		multi: true,
	});
};

module.exports = {
	setMongodbClient: setMongodbClient,
	create: create,
	findOne: findOne,
	update: update,
};