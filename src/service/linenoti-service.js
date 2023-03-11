const axios = require("axios");
const { User } = require("../models");
const qs = require("qs");

const sendLinenoti = async (userId, text) => {
  try {
    const { lineToken } = await User.findOne({
      where: { id: userId }
    });

    const url = "https://notify-api.line.me/api/notify";
    const jsonData = {
      message: text
    };

    const accessCode = lineToken;

    const requestOption = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ` + accessCode
      },
      data: qs.stringify(jsonData),
      url
    };

    const a = await axios(requestOption);
    console.log(JSON.parse(JSON.stringify(lineToken)), "user");

    a = await (axiosRes => {
      if (axiosRes.status === 200) {
        console.log("Notification Success");
        res.status(201).end();
      }
    }).catch(error => {
      res.status(201).end();
      console.log(error.response.data);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendLinenoti };
