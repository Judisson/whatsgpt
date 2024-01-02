const { sendMessageGPT, responseMessageWhats } = require("../class/instance");

exports.QuestionToGPT = (req, res) => {
  sendMessageGPT(req.body)
    .then((response) => {
      const responseToSend = {response}
      console.log("7 - responseToSend:", response)
      responseMessageWhats(response)
      return res
        .status(200)
        .json(responseToSend);
    })
    .catch((err) => {
      console.error("erro: ", err);
      return res.status(500).json({ error: err.message });
    });
};
