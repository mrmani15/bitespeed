const { find, findOne } = require("../models/contacts");

const isExist = (arr, val, key) => {
  let isPresent = false;
  arr.forEach((data) => {
    if (data[key] === val) {
      isPresent = true;
    }
  });

  return isPresent;
};

const generateResponse = async (email, phoneNumber) => {
  let details = await find({ $or: [{ email }, { phoneNumber }] });

  return responseFormat(details);
};

const responseFormat = async (details) => {
  //check if all the linkedId is present in details array or not.
  let isPrimaryExist = false;
  details.forEach((detail) => {
    if (detail.linkPrecedence === "primary") {
      isPrimaryExist = true;
    }
  });
console.log(details);
  if (!isPrimaryExist) {
    details = await getAllLinks(details);
  }
    
    

  let primaryData = details.filter((d) => d.linkPrecedence === "primary");
  let emailList = primaryData.length ? [primaryData[0].email] : [null];
  let phoneList = primaryData.length ? [primaryData[0].phoneNumber] : [null];
  let secondaryContactIds = [];

  details.forEach((d) => {
    if (d.linkPrecedence === "secondary") {
      emailList.push(d.email);
      phoneList.push(d.phoneNumber);
      secondaryContactIds.push(String(d._id));
    }
  });

  // keep unique entries only
  let emailListSet = new Set(emailList);
  emailList = [...emailListSet];

  let phoneListSet = new Set(phoneList);
  phoneList = [...phoneListSet];

  let secondaryContactIdsSet = new Set(secondaryContactIds);
  secondaryContactIds = [...secondaryContactIdsSet];

  let response = {
    contact: {
      primaryContatctId: primaryData.length ? primaryData[0]._id : null,
      emails: emailList,
      phoneNumbers: phoneList,
      secondaryContactIds: secondaryContactIds,
    },
  };

  return response;
};
async function getAllLinks(details, processedIds = new Set()) {
  let isPrimaryExist = false;

  // Check if any primary document exists
  for (let i = 0; i < details.length; i++) {
    const detail = details[i];
    if (detail.linkPrecedence === "primary") {
      isPrimaryExist = true;
      break;
    }
  }

  // If a primary document exists, return the array as it is
  if (isPrimaryExist) return details;

  // If no primary document exists, fetch parent documents for secondary documents
  for (let i = 0; i < details.length; i++) {
    const detail = details[i];
    if (
      detail.linkPrecedence === "secondary" &&
      !processedIds.has(detail._id)
    ) {
      processedIds.add(detail._id); // Mark the document as processed

      let data = await findOne({ _id: detail.linkedId });
      if (data) {
        details.push(data);
        await getAllLinks(details, processedIds);
      }
    }
  }

  return details;
}

module.exports = {
  isExist,
  responseFormat,
  generateResponse,
};
