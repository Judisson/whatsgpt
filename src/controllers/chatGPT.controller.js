const { sendMessageGPT, responseMessageWhats } = require("../class/instance");

exports.QuestionToGPT = (req, res) => {
  sendMessageGPT(req.body.question)
    .then((response) => {
      const responseToSend = {response}
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
