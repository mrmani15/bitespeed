const {
  create,
  findOne,
  find,
  findAllSecondary,
  update,
} = require("../models/contacts");

const identifyController = async (req, res) => {
  try {
    // extracting keys from body

    // check either email or phoneNumber is exist or not. (one must exist)

    // get contact details based on either email or phoneNumber

    // if constact details exists
        // check if both email and phoneNumber is exists in this details array

        // if any one is not exist then create document for that with secondary linkPrecedence

        // if both fields exist

        // filter out the primary documents data

        // if primary data length is 1

        // if primary data length is more than 1 then update the linkPrecendance


    // if details not found create a new entry if details not found


  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

module.exports = { identifyController };
