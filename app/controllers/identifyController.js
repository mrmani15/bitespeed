const {
  create,
  find,
  findAllSecondary,
  update,
} = require("../models/contacts");

const {
  isExist,
  generateResponse,
  responseFormat,
} = require("../utils/helper");

const identifyController = async (req, res) => {
  try {
    // extracting keys from body
    const { email, phoneNumber } = req.body;
    let response;

    // check either email or phoneNumber is exist or not. (one must exist)
    if (!email && !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "please provide email or phoneNumber.",
      });
    }

    // get contact details based on either email or phoneNumber
    let details;
    if (email && phoneNumber) {
      details = await find({ $or: [{ email }, { phoneNumber }] });
    } else if (email) {
      details = await find({ email: email });
    } else {
      details = await find({ phoneNumber: phoneNumber });
    }

    // if contact details exists
    if (details.length > 0) {
      let isEmailExist = isExist(details, email, "email");
      let isPhoneNumberExist = isExist(details, phoneNumber, "phoneNumber");

      // if any one is not exist then create document for that with secondary linkPrecedence
      if ((!isEmailExist && email) || (!isPhoneNumberExist && phoneNumber)) {
        let data = {
          phoneNumber: phoneNumber,
          email: email,
          linkedId: details[0]._id,
          linkPrecedence: "secondary",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        await create(data);

        response = await generateResponse(email, phoneNumber);
        return res.status(200).json(response);
      }

      // filter out the primary documents data
      let primaryData = details.filter((d) => d.linkPrecedence === "primary");

      // if primary data length is 1
      if (primaryData.length < 2) {
        response = await responseFormat(details);
        return res.status(200).json(response);
      } else {
        // if primary data length is more than 1 then update the linkPrecendance
        let details = await findAllSecondary({
          $or: [{ email }, { phoneNumber }],
        });

        await update(
          { _id: details[0]._id },
          { $set: { linkPrecedence: "secondary" } }
        );

        response = await generateResponse(email, phoneNumber);
        return res.status(200).json(response);
      }
    } else {
      // if details not found create a new entry if details not found
      let data = {
        phoneNumber: phoneNumber,
        email: email,
        linkedId: null,
        linkPrecedence: "primary",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      await create(data);

      response = await generateResponse(email, phoneNumber);
      return res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

module.exports = { identifyController };
