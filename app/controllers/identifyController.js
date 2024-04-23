const { create, findOne } = require("../models/contacts");

const identifyController = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    let response = {
      contact: {
        primaryContatctId: null,
        emails: [],
        phoneNumbers: [],
        secondaryContactIds: [],
      },
    };
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "some error occured" });
  }
};

module.exports = { identifyController };
